// import '../../globals.css'
import UserSessionProvider from '@/app/providers/userSessionProvider'
import NavSidebar from '@/components/NavSidebar'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Whyphi - Rush Home',
  description: "PCT Zeta Chapter - Rush Home Page",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserSessionProvider>
      <NavSidebar />
      <div className="flex flex-col mx-auto justify-center">
        {children}
      </div>
    </UserSessionProvider>


  )
}
