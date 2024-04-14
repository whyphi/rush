// import '../../globals.css'
import UserSessionProvider from '@/app/providers'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Whyphi - Rush',
  description: "PCT Zeta Chapter - Rush",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserSessionProvider>

      <div className="flex flex-col mx-auto justify-center max-w-screen-lg">
        {children}
      </div>
    </UserSessionProvider>


  )
}
