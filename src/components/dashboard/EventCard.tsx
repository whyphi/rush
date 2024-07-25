import { Event } from "@/types/Events";
import { Card } from "flowbite-react";
import Image from "next/image";
import Timestamp from "react-timestamp";

interface EventCardProps {
  event: Event
}

export default function EventCard({
  event
}: EventCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href={`/checkin/${event._id}`}>
          <img className="rounded-t-lg" src={event.eventCoverImage} alt={event.eventCoverImageName} />
          <div className="flex flex-col gap-2 m-4">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {event.name}
            </h5>
            <h3 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              <Timestamp date={new Date(event.date)} />
            </h3>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Location: {event.location}
            </p>
          </div>
        </a>
    </div>
  )
};