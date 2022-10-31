import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Event, Prisma } from '@prisma/client';

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async findById(id: number): Promise<Event | null> {
    const where: Prisma.EventWhereUniqueInput = { id };
    return this.prisma.event.findUnique({
      where,
    });
  }

  async create(event: EventDTO): Promise<Event> {
    const data: Prisma.EventCreateInput = {
      title: event.title.toLocaleLowerCase(),
      content: event.content.toLocaleLowerCase(),
      startDate: new Date(event.startDate),
      duration: event.duration,
      private: event.private,
      organizer: {
        connect: {
          id: event.userId,
        },
      },
    };

    return this.prisma.event.create({
      data,
    });
  }

  async update(id: number, event: EventDTO): Promise<Event> {
    const where: Prisma.EventWhereUniqueInput = { id };
    const currentEvent = await this.findById(id);
    const data: Prisma.EventCreateInput = {
      title: event.title ? event.title.toLocaleLowerCase() : currentEvent.title,
      content: event.content
        ? event.content.toLocaleLowerCase()
        : currentEvent.content,
      startDate: event.startDate
        ? new Date(event.startDate)
        : currentEvent.startDate,
      duration: event.duration ? event.duration : currentEvent.duration,
      private: event.private ? event.private : currentEvent.private,
    };

    return this.prisma.event.update({
      where,
      data,
    });
  }

  async remove(id: number): Promise<Event> {
    const where: Prisma.EventWhereUniqueInput = { id };
    return this.prisma.event.delete({
      where,
    });
  }
}
