// import '../../globals.css'
import UserSessionProvider from '@/app/providers/userSessionProvider'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Whyphi - Rush Checkin',
  description: "PCT Zeta Chapter - Rush Checkin Page",
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
