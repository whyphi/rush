"use client"
import { useSession, signIn } from "next-auth/react"
import Loader from '@/components/Loader';

export default function UserSessionProvider({
  children
}: {
  children: React.ReactNode,
}) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <body>
        <Loader />
      </body>
    )
  }

  if (status === "unauthenticated") {
    signIn('google')
    return
  }

  return (
    <>
      {children}
    </>
  )
}
