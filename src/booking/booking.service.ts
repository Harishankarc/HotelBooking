import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BookingService {

  constructor(private readonly databaseService: DatabaseService){}

  async create(createBookingDto: Prisma.BookingCreateInput) {
    const roomId = createBookingDto.room.connect?.id;
    if(!roomId){
      throw new BadRequestException('Room id is required');
    }

    const room = await this.databaseService.room.findUnique({
      where:{
        id: roomId,
      }
    })

    if(!room){
      throw new NotFoundException('Room not found');
    }

    if(!room.isAvailable){
      throw new BadRequestException('Room is not available');
    }

    const booking = await this.databaseService.booking.create({
      data: createBookingDto,
    });

    await this.databaseService.room.update({
      where:{
        id : roomId
      },
      data:{
        isAvailable: false
      }
    })

    return booking;
  }

  async findAll() {
    const bookings = await this.databaseService.booking.findMany();
    if(!bookings){
      throw new NotFoundException('Bookings not found');
    }
    return bookings;
  }

  async findOne(id: number) {

    const booking = await this.databaseService.booking.findUnique({
      where:{
        id,
      }
    });

    if(!booking){
      throw new NotFoundException(`Booking not found with id: ${id}`);
    }
    return booking;

  }

  async update(id: number, updateBookingDto: Prisma.BookingUpdateInput) {
    const booking = await this.databaseService.booking.update({
      where:{
        id
      },
      data: updateBookingDto
    });

    if(!booking){
      throw new NotFoundException(`Booking not found with id: ${id} to update`);
    }
    return booking;

  }

  async remove(id: number) {
    const removedItem = await this.databaseService.booking.delete({
      where:{
        id
      }
    });

    await this.databaseService.room.update({
      where:{
        id : removedItem.roomId
      },
      data:{
        isAvailable: true
      }
    })

    if(!removedItem){
      throw new NotFoundException(`Booking not found with id: ${id} to delete`);
    }

    return removedItem;
  }
}
