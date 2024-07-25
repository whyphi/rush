"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react";
import { Event, RushCategory } from "@/types/Events"
import { useRouter } from 'next/navigation'
import Loader from "@/components/Loader"
import EventCard from "@/components/dashboard/EventCard";

export default function Dashboard({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [rushCategory, setRushCategory] = useState<RushCategory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  console.log(rushCategory?.events);
  

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/rush/default`, {
    })
      .then((res) => {
        if (!res.ok) {
          // router.push("/checkin/error");
          throw new Error("Failed to fetch event");
        }
        return res.json();
      })
      .then((data) => {
        setRushCategory(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="mt-20 lg:justify-center lg:items-center">
      <div className="px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {rushCategory?.events.map((event, index) => (
          <div key={index} className="max-w-lg">
            <EventCard event={event}/>
          </div>
        ))}
      </div>
    </div>
  );
};