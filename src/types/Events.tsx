export interface RushCategory {
  _id: string,
  name: string,
  defaultRushCategory: boolean,
  dateCreated: string,
  events: [Event],
}

export interface Event {
  _id: string,
  categoryId: string,
  name: string,
  dateCreated: string,
  numAttendees: number | null,
  location: string,
  date: string,
  deadline: string,
  eventCoverImage: string,
  eventCoverImageName: string,
  lastModified: string,
  attendeesId: string,
}