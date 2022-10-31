import { Injectable } from '@nestjs/common';
import { EventAttendee, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventAttendeeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<EventAttendee[]> {
    return this.prisma.eventAttendee.findMany();
  }

  async findById(id: number): Promise<EventAttendee | null> {
    const where: Prisma.EventAttendeeWhereUniqueInput = { id };
    return this.prisma.eventAttendee.findUnique({
      where,
    });
  }

  async create(eventAttendee: EventAttendeeDTO): Promise<EventAttendee> {
    let user: User;
    if (!eventAttendee.userId) {
      user = await this.prisma.user.findUnique({
        where: {
          email: eventAttendee.email,
        },
      });
    }

    const data: Prisma.EventAttendeeCreateInput = {
      event: {
        connect: {
          id: eventAttendee.eventId,
        },
      },
      attendee: {
        connect: {
          id: eventAttendee.userId ? eventAttendee.userId : user.id,
        },
      },
    };

    return this.prisma.eventAttendee.create({
      data,
    });
  }

  async update(
    id: number,
    eventAttendee: EventAttendeeDTO,
  ): Promise<EventAttendee> {
    const where: Prisma.EventAttendeeWhereUniqueInput = { id };
    const currentEventAttendee = await this.findById(id);
    const data: Prisma.EventAttendeeCreateInput = {
      event: {
        connect: {
          id: eventAttendee.eventId
            ? eventAttendee.eventId
            : currentEventAttendee.eventId,
        },
      },
      attendee: {
        connect: {
          id: eventAttendee.userId
            ? eventAttendee.userId
            : currentEventAttendee.userId,
        },
      },
      attendance: eventAttendee.attendance
        ? eventAttendee.attendance
        : currentEventAttendee.attendance,
    };

    return this.prisma.eventAttendee.update({
      where,
      data,
    });
  }

  async remove(id: number): Promise<EventAttendee> {
    const where: Prisma.EventAttendeeWhereUniqueInput = { id };
    return this.prisma.eventAttendee.delete({
      where,
    });
  }
}
