import { DashboardEvent } from "@/types/Events";
import { Badge, Card } from "flowbite-react";
import { useRouter } from 'next/navigation'
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

  return (
    <Card
      className="cursor-pointer"
      imgAlt={event.eventCoverImageName}
      imgSrc={event.eventCoverImage}
      onClick={() => router.push(`/checkin/${event._id}`)}
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
          Status: <Badge color="success">Checked-in</Badge>
        </p>
    </Card>
  )
};