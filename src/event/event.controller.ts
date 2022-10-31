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
  findById(@Param('id') id: string) {
    return this.eventService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() event: EventDTO) {
    return this.eventService.update(+id, event);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
