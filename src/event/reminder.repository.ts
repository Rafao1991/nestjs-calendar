import { Injectable } from '@nestjs/common';
import { Prisma, Reminder } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReminderRepository {
  constructor(private prismaService: PrismaService) {}

  async create(reminder: ReminderDTO): Promise<Reminder> {
    let currentReminder = await this.prismaService.reminder.findFirst({
      where: {
        AND: [
          {
            eventId: reminder.eventId,
          },
          {
            remindeAt: new Date(reminder.remindeAt),
          },
        ],
      },
    });

    if (!currentReminder) {
      const data: Prisma.ReminderCreateInput = {
        event: {
          connect: {
            id: reminder.eventId,
          },
        },
        remindeAt: new Date(reminder.remindeAt),
      };

      currentReminder = await this.prismaService.reminder.create({
        data,
      });
    }

    const data: Prisma.ReminderUserCreateInput = {
      reminder: {
        connect: {
          id: currentReminder.id,
        },
      },
      user: {
        connect: {
          id: reminder.userId,
        },
      },
    };
    await this.prismaService.reminderUser.create({
      data,
    });

    return currentReminder;
  }
}
