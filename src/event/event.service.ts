import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { EventRepository } from './event.repository';
import { EventAttendeeRepository } from './eventAttendee.repository';
import { ReminderRepository } from './reminder.repository';

@Injectable()
export class EventService {
  constructor(
    private eventRepository: EventRepository,
    private eventAttendeeRepository: EventAttendeeRepository,
    private reminderRepository: ReminderRepository,
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

  answer(answer: EventAttendeeDTO) {
    return this.eventAttendeeRepository.update(answer);
  }

  async findByUserIdAndTimeSpan(userId: number, start: Date, end: Date) {
    const resultEvents: Event[] = [];

    const events = await this.eventRepository.findByUserIdAndTimeSpan(
      userId,
      start,
      end,
    );

    const eventAttendees =
      await this.eventAttendeeRepository.findByUserIdAndTimeSpan(
        userId,
        start,
        end,
      );

    events.forEach((event) => {
      if (event.private) {
        resultEvents.push({
          id: event.id,
          title: 'private event',
          content: '',
          startDate: event.startDate,
          duration: event.duration,
          private: event.private,
          userId: event.userId,
        });
        return;
      }

      resultEvents.push(event);
    });

    for (const eventAttendee of eventAttendees) {
      const event = await this.findById(eventAttendee.eventId);
      resultEvents.push(event);
    }

    return resultEvents;
  }

  createReminder(reminder: ReminderDTO) {
    return this.reminderRepository.create(reminder);
  }
}
