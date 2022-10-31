import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() event: EventDTO) {
    return this.eventService.create(event);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.eventService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() event: EventDTO) {
    return this.eventService.update(+id, event);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventService.remove(+id);
  }

  @Post('answer')
  answer(@Body() answer: EventAttendeeDTO) {
    return this.eventService.answer(answer);
  }

  @Get('user/:id')
  findByUserIdAndTimeSpan(
    @Param('id') id: number,
    @Body() timeSpan: TimeSpanDTO,
  ) {
    return this.eventService.findByUserIdAndTimeSpan(
      +id,
      new Date(timeSpan.start),
      new Date(timeSpan.end),
    );
  }

  @Post('reminder')
  createReminder(@Body() reminder: ReminderDTO) {
    return this.eventService.createReminder(reminder);
  }
}
