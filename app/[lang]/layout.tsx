import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import LocaleHomeSwitch from '../components/locale-home-switch'

const navbar = (
  <Navbar
    logo={<b>OpenCashier</b>}
    projectLink="https://github.com/aaaaaajie/OpenCashier"
  >
    <LocaleHomeSwitch />
  </Navbar>
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
      <Layout
        navbar={navbar}
        footer={footer}
        pageMap={await getPageMap(`/${lang}`)}
        docsRepositoryBase="https://github.com/aaaaaajie/OpenCashier-docs/blob/main"
      >
        {children}
      </Layout>
    </>
  )
}
