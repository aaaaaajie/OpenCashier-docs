'use client'

import { Select } from 'nextra/components'
import { GlobeIcon } from 'nextra/icons'
import { addBasePath } from 'next/dist/client/add-base-path'
import { usePathname } from 'next/navigation'

const LOCALES = ['en', 'zh-CN'] as const
const LOCALE_LABELS: Record<(typeof LOCALES)[number], string> = {
  en: 'English',
  'zh-CN': '中文'
}

const ONE_YEAR = 365 * 24 * 60 * 60 * 1_000

function getLocaleFromPath(pathname: string) {
  const segment = pathname.split('/', 2)[1]
  return LOCALES.includes(segment as (typeof LOCALES)[number])
    ? (segment as (typeof LOCALES)[number])
    : 'en'
}

export default function LocaleHomeSwitch() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const selectedOption = (
    <span className="x:flex x:items-center x:gap-2">
      <GlobeIcon height="12" />
      {LOCALE_LABELS[locale]}
    </span>
  )

  return (
    <Select
      title="Change language"
      className="x:flex x:items-center x:gap-2"
      value={locale}
      selectedOption={selectedOption}
      options={LOCALES.map((item) => ({
        id: item,
        name: LOCALE_LABELS[item]
      }))}
      onChange={(lang) => {
        const date = new Date(Date.now() + ONE_YEAR)
        document.cookie = `NEXT_LOCALE=${lang}; expires=${date.toUTCString()}; path=/`
        location.href = addBasePath(`/${lang}`)
      }}
    />
  )
}
