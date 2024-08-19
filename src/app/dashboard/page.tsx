"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import {  RushCategory } from "@/types/Events"
import { useRouter } from 'next/navigation'
import Loader from "@/components/Loader"
import EventCard from "@/components/dashboard/EventCard";
import { AdminTextStyles } from "@/styles/TextStyles";

export default function Dashboard() {
  const { data: session } = useSession();
  const [rushCategory, setRushCategory] = useState<RushCategory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    // ensure user is defined
    if (!session?.user) return;

    const email = session.user.email
    
    const fetchRushEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/rush/default`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email })
        });
        if (!response.ok) {
          // router.push("/checkin/error");
          setError(new Error("Failed to fetch event"));
        }
        const data: RushCategory = await response.json();
        setRushCategory(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    fetchRushEvents();
  }, [session]);

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <div className="mt-20 mx-4 lg:mx-10 lg:justify-center lg:items-center">
      {!(rushCategory?.events && rushCategory.events.length > 0  )
      ?
      <div className="flex flex-col gap-2">
        <div className={AdminTextStyles.subtitle}>No events yet 😢</div>
        <div className={AdminTextStyles.default}>
          (If you think this is an error, please reach out to <a className={AdminTextStyles.email} href="mailto:techteampct@gmail.com">techteampct@gmail.com</a>)
        </div>
      </div>
      :
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {rushCategory?.events.map((event, index) => (
          <div key={index} className="col-span-1">
            <EventCard event={event}/>
          </div>
        ))}
      </div>
      }
    </div>
  );
};