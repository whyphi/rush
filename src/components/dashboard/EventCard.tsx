import { DashboardEvent } from "@/types/Events";
import { Badge, Card } from "flowbite-react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import Timestamp from "react-timestamp";

interface EventCardProps {
  event: DashboardEvent
}

export default function EventCard({
  event
}: EventCardProps) {
  const router = useRouter();

  const eventDeadline = new Date(event.deadline);
  const isEventPassed = eventDeadline < new Date();
  const disabled = isEventPassed || event.checkedIn

  const handleEventClick = () => {
    if (!disabled) {
      router.push(`/checkin/${event._id}`)
    }
  }

  const renderStatus = () => (
    event.checkedIn ? (
      <Badge color="success">Checked-in</Badge>
    ) : (
      <>
        {isEventPassed ? (
          <Badge color="failure">Did not attend</Badge>
        ) : (
          <Badge color="warning">Not checked-in</Badge>
        )}
      </>
    )
  )

  return (
    <Card
      className={`${disabled ? "bg-gray-200 cursor-not-allowed" : "cursor-pointer"}`}
      renderImage={() => (
        <div className="relative">
          <img
            className="rounded-t-lg"
            alt={event.eventCoverImageName}
            src={event.eventCoverImage}
          />
          {disabled && <div className="absolute inset-0 bg-gray-200 opacity-50 rounded-t-lg"></div>}
      </div>
      )}
      onClick={handleEventClick}
    >
        <h5 className="flex items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span className={`flex w-2 h-2 me-3 ${isEventPassed ? "bg-red-500" : "bg-green-500"} rounded-full`}></span>
          {event.name}
        </h5>
        <h3 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
          <Timestamp date={new Date(event.date)} />
        </h3>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Location: {event.location}
        </p>
        <p className="flex items-center gap-2 font-normal text-gray-700 dark:text-gray-400">
          Status:
          {renderStatus()}
        </p>
    </Card>
  )
};