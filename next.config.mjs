import nextra from 'nextra'

const withNextra = nextra({
  unstable_shouldAddLocaleToLinks: true
})

export default withNextra({
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'zh-CN'],
    defaultLocale: 'en'
  }
})
