// import '../../globals.css'
import UserSessionProvider from '@/app/providers/userSessionProvider'
import NavSidebar from '@/components/NavSidebar'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'WhyPhi - Rush Checkin Error',
  description: "PCT Zeta Chapter - Rush Checkin Page",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserSessionProvider>
      <NavSidebar />
      <div className="flex justify-center">
        <div className="sm:ml-64 max-w-[calc(100%-64px)]">
          {children}
        </div>
      </div>
    </UserSessionProvider>


  )
}