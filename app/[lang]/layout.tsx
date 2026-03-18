import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

const navbar = (
  <Navbar
    logo={<b>OpenCashier</b>}
    projectLink="https://github.com/aaaaaajie/OpenCashier"
  />
)

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © OpenCashier.
  </Footer>
)

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <>
      <Head />
      <Layout
        navbar={navbar}
        footer={footer}
        pageMap={await getPageMap(`/${lang}`)}
        docsRepositoryBase="https://github.com/aaaaaajie/OpenCashier-docs/blob/main"
        i18n={[
          { locale: 'en', name: 'English' },
          { locale: 'zh-CN', name: '中文' }
        ]}
      >
        {children}
      </Layout>
    </>
  )
}
