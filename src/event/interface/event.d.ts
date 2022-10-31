interface EventDTO {
  id?: number;
  title?: string;
  content?: string;
  startDate?: string;
  duration?: number;
  private?: boolean;
  userId?: number;
  attendees?: EventAttendeeDTO[];
}

interface EventAttendeeDTO {
  id?: number;
  eventId?: number;
  userId?: number;
  email?: string;
  attendance?: boolean;
}
