export const metadata = {
  title: {
    default: 'OpenCashier Docs',
    template: '%s | OpenCashier Docs'
  },
  description: 'OpenCashier documentation site.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
