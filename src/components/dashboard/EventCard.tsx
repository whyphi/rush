import { DashboardEvent } from "@/types/Events";
import { Badge, Card } from "flowbite-react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import Timestamp from "react-timestamp";
import ImagePlaceholder from "@/components/dashboard/ImagePlaceholder";

interface EventCardProps {
  event: DashboardEvent
}

export default function EventCard({
  event
}: EventCardProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const eventDeadline = new Date(event.deadline);
  const eventDate = new Date(event.date);
  const now = new Date();
  const isEventPassed = eventDeadline < now;
  const isBeforeEvent =  now < eventDate;
  const disabled = isBeforeEvent || isEventPassed || event.checkedIn

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
      className={`${disabled ? "bg-gray-200 dark:bg-gray-600 cursor-not-allowed" : "card cursor-pointer"}`}
      renderImage={() => (
        <div className="relative">
          {loading && <ImagePlaceholder />}
          <img
            className={`rounded-t-lg w-full ${loading && "hidden"}`}
            src={event.eventCoverImage}
            alt={event.eventCoverImageName}
            onLoad={() => setLoading(false)} // Set loading to false when the image is loaded
            onError={() => setLoading(false)} // Handle error case
          />
          {disabled && <div className="absolute inset-0 bg-gray-200 opacity-50 rounded-t-lg"></div>}
      </div>
      )}
      onClick={handleEventClick}
    >
        <div className="flex items-center justify-between">
          <h5 className="flex items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className={`flex w-2 h-2 me-3 ${isEventPassed ? "bg-red-500" : "bg-green-500"} rounded-full`}></span>
            {event.name}
          </h5>
          {!disabled && <Badge color="success">In-progress</Badge>}
        </div>
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