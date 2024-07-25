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
  return (
    <Card 
      className="p-0 gap-0 cursor-pointer"
      imgAlt={event.eventCoverImageName}
      imgSrc={event.eventCoverImage}
      onClick={() => router.push(`/checkin/${event._id}`)}
    >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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