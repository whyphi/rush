"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useSession, signOut } from "next-auth/react";

export default function Checkin() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-32">
      <div className="absolute top-0 right-0 mt-6 mr-2 sm:mr-6 md:mr-12">
        <Button variant="link" type="button" onClick={() => signOut(({ callbackUrl: "https://bupct.com/" }))}>Logout</Button>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hi, {session?.user?.name}!</h1>
      <h3 className="text-md font-light text-gray-600 dark:text-white mb-6">Welcome to Phi Chi Theta, Zeta Chapter's Rush! We're excited to have you here.</h3>
      <div className="flex flex-col">
        <p className="text-md">Please enter your code to check-in:</p>
        <div className="flex items-center space-x-2 mt-1 mb-8">
          <Input type="text" placeholder="Code" />
        </div>
        <Button className="w-24" type="submit">Submit</Button>
      </div>
    </div>
  );
}


