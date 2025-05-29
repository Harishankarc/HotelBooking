import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Prisma } from 'generated/prisma';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: Prisma.BookingCreateInput) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: Prisma.BookingUpdateInput) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
