#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ENV_FILE:-$ROOT_DIR/.env.deploy}"
ENV_EXAMPLE_FILE="$ROOT_DIR/.env.deploy.example"
COMPOSE_FILE="$ROOT_DIR/docker-compose.deploy.yml"
ACTION="${1:-deploy}"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker 未安装，无法继续部署。" >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "docker compose 不可用，无法继续部署。" >&2
  exit 1
fi

ensure_env_file() {
  if [[ ! -f "$ENV_FILE" ]]; then
    cp "$ENV_EXAMPLE_FILE" "$ENV_FILE"
    echo "已创建 $ENV_FILE，未修改时将继续使用默认 3001 端口部署。"
  fi
}

load_env() {
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
}

compose() {
  docker compose \
    --env-file "$ENV_FILE" \
    -p "${COMPOSE_PROJECT_NAME:-opencashier-docs}" \
    -f "$COMPOSE_FILE" \
    "$@"
}

print_access_hint() {
  local bind_host="${DOCS_HOST_BIND:-0.0.0.0}"
  local port="${DOCS_PORT:-3001}"

  if [[ "$bind_host" == "127.0.0.1" ]]; then
    echo "服务已启动，仅监听 127.0.0.1:${port}。"
    echo "请在现有 Nginx/Caddy/Traefik 中反向代理到该地址。"
  else
    echo "服务已启动，可直接访问: http://<server-ip>:${port}"
  fi
}

ensure_env_file
load_env

case "$ACTION" in
  deploy)
    compose up -d --build --remove-orphans
    print_access_hint
    ;;
  restart)
    compose up -d --build --remove-orphans
    print_access_hint
    ;;
  stop)
    compose down
    ;;
  logs)
    compose logs -f --tail=200
    ;;
  status)
    compose ps
    ;;
  pull)
    compose build --pull
    ;;
  *)
    cat <<'EOF'
用法:
  ./scripts/deploy.sh deploy   构建并启动
  ./scripts/deploy.sh restart  重建并重启
  ./scripts/deploy.sh stop     停止并删除容器
  ./scripts/deploy.sh logs     查看日志
  ./scripts/deploy.sh status   查看状态
  ./scripts/deploy.sh pull     拉取最新基础镜像并重建
EOF
    exit 1
    ;;
esac
