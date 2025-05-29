import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RoomService {

  constructor(private readonly databaseService: DatabaseService){}

  async create(createRoomDto: Prisma.RoomCreateInput) {
    return this.databaseService.room.create({
      data: createRoomDto,
    });
  }

  async findAll() {
    const rooms = await this.databaseService.room.findMany();
    if(!rooms){
      throw new NotFoundException('Rooms not found');
    }
    return rooms;
  }

  async findOne(id: number) {
    const room = await this.databaseService.room.findUnique({
      where: {
        id,
      }
    });
    if(!room){
      throw new NotFoundException(`Room not found with id: ${id}`);
    }
    return room;
  }

  async update(id: number, updateRoomDto: Prisma.RoomUpdateInput) {
    const room = await this.databaseService.room.update({
      where:{
        id,
      },
      data: updateRoomDto,
    });
    if(!room){
      throw new NotFoundException(`Room not found with id: ${id} to update`);
    }
    return room;
  }

  async remove(id: number) {
    const room = await this.databaseService.room.delete({
      where:{
        id,
      }
    });
    if(!room){
      throw new NotFoundException(`Room not found with id: ${id} to delete`);
    }
    return room;
  }
}
