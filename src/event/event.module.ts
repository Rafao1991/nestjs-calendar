import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'src/prisma.service';
import { EventRepository } from './event.repository';
import { EventAttendeeRepository } from './eventAttendee.repository';

@Module({
  controllers: [EventController],
  providers: [
    EventService,
    PrismaService,
    EventRepository,
    EventAttendeeRepository,
  ],
})
export class EventModule {}
