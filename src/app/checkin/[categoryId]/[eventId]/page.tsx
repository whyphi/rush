"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react";
import { Event } from "@/types/Events"
import { useRouter } from 'next/navigation'
import Loader from "@/components/Loader"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface CheckinParams {
  params: {
    categoryId: string;
    eventId: string;
  }
}

export default function Checkin({ 
  params,
}: CheckinParams) {
  const router = useRouter();
  const { data: session } = useSession();
  const [event, setEvent] = useState<Event | null>(null);
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/rush/${params.eventId}`, {
    })
      .then((res) => {
        if (!res.ok) {
          router.push("/checkin/error");
          throw new Error("Failed to fetch event");
        }
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleSubmit = () => {
    setIsButtonDisabled(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/rush/checkin/${params.eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        name: session?.user?.name,
        email: session?.user?.email,
      }),
    })
      .then(async (res) => {
        console.log(res)
        setIsButtonDisabled(false);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.Message);
        }
        return res.json();
      })
      .then((data) => {
        router.push("/checkin/success");
      })
      .catch((err) => {
        setError(err);
        setIsButtonDisabled(false);
      });
  }

  const AlertComponent = () => {
    return (
      error && (
        <Alert
          variant="destructive"
          className="absolute top-0 left-0 w-full m-4 bg-white z-50"
        >
          {/* <AlertCircle className="h-4 w-4" /> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4 lucide lucide-circle-alert"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message}
          </AlertDescription>
          <button
            type="button"
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={() => {
              setError(null);

            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="m-1 h-4 w-4 lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </Alert>
      )
    )
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-32">
      <AlertComponent />
      {/* <div className="absolute top-0 right-0 mt-6 mr-2 sm:mr-6 md:mr-12">
        <Button variant="link" type="button" onClick={() => signOut(({ callbackUrl: "https://bupct.com/" }))}>Logout</Button>
      </div> */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hi, {session?.user?.name}!</h1>
      <h3 className="text-md font-light text-gray-600 dark:text-white mb-6">Welcome to Phi Chi Theta, Zeta Chapter's Rush! We're excited to have you here.</h3>
      <div className="flex flex-col">
        <p className="text-md">Please enter your code to check-in to {event?.name}:</p>
        <div className="flex items-center space-x-2 mt-1 mb-8">
          <Input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <Button className="w-24" type="submit" onClick={handleSubmit} disabled={isButtonDisabled} >Submit</Button>
      </div>
    </div>
  );
}


