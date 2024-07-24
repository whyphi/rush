"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react";
import { Event } from "@/types/Events"
import { useRouter } from 'next/navigation'
import Loader from "@/components/Loader"

export default function Dashboard({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [event, setEvent] = useState<Event | null>(null);
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  console.log(session);
  

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-32">
      hello world
    </div>
  );
}


