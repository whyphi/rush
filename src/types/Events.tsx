export interface RushTimeframe {
  id: string;
  name: string;
  default_rush_timeframe: boolean;
  date_created: string;
  events: readonly DashboardEvent[];
}

export interface EventRush {
  id: string;
  timeframe_id: string;
  name: string;
  date_created: string;
  last_modified: string;
  location: string;
  date: string;
  deadline: string;
  event_cover_image: string;
  event_cover_image_name: string;
}

export interface DashboardEvent extends EventRush {
  checked_in: boolean;
}
