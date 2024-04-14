"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useSession, signOut } from "next-auth/react";

export default function Checkin() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col justify-center p-24">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hi, {session?.user?.name}!</h1>
      <h3 className="text-md font-light text-gray-600 dark:text-white mb-6">Welcome to Phi Chi Theta, Zeta Chapter's Rush! We're excited to have you here.</h3>
      <div className="flex flex-col">
        <p>Please enter your code to check-in:</p>
        <div className="flex items-center space-x-2 mt-2 mb-4">
          <Input type="text" placeholder="Code" />
        </div>
        <div className="flex flex-row items-center mb-8">
          <Checkbox id="terms" className="mr-2" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I confirm that I consent to Phi Chi Theta, Zeta Chapter processing my email address to track event attendance.
          </label>
        </div>
        <Button className="" type="submit">Submit</Button>
      </div>
    </div>
  );
}
