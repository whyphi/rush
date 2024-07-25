import { Event } from "@/types/Events";
import { Card } from "flowbite-react";
import Image from "next/image";

interface EventCardProps {
  event: Event
}

export default function EventCard({
  event
}: EventCardProps) {
  return (

    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href={`/checkin/${event._id}`}>
            <img className="rounded-t-lg" src={event.eventCoverImage} alt={event.eventCoverImageName} />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {event.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          </div>
        </a>
    </div>


  )
}