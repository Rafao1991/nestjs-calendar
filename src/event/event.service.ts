import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository';
import { EventAttendeeRepository } from './eventAttendee.repository';

@Injectable()
export class EventService {
  constructor(
    private eventRepository: EventRepository,
    private eventAttendeeRepository: EventAttendeeRepository,
  ) {}

  async create(event: EventDTO) {
    const createdEvent = await this.eventRepository.create(event);

    if (event.attendees) {
      event.attendees.forEach((attendee) => {
        attendee.eventId = createdEvent.id;
        this.eventAttendeeRepository.create(attendee);
      });
    }

    return createdEvent;
  }

  findAll() {
    return this.eventRepository.findAll();
  }

  findById(id: number) {
    return this.eventRepository.findById(id);
  }

  update(id: number, event: EventDTO) {
    return this.eventRepository.update(id, event);
  }

  remove(id: number) {
    return this.eventRepository.remove(id);
  }
}
