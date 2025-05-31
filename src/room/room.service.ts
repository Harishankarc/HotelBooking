import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RoomService {

  constructor(private readonly databaseService: DatabaseService){}

  async create(createRoomDto: Prisma.RoomCreateInput) {
      try{
        return this.databaseService.room.create({
          data: createRoomDto,
        });
      }catch(e){
        throw new HttpException("Cannot create room", HttpStatus.INTERNAL_SERVER_ERROR)
      }
  }

  async findAll() {
      try{
        const rooms = await this.databaseService.room.findMany();
        if(rooms.length === 0 || !rooms){
          throw new HttpException('Rooms not found',HttpStatus.NOT_FOUND);
        }
        return rooms;
      }catch(e){
        throw new HttpException("Cannot find rooms", HttpStatus.INTERNAL_SERVER_ERROR)
      }

  }

  async findOne(id: number) {
    try{
      const room = await this.databaseService.room.findUnique({
        where: {
          id,
        }
      });
      if(!room){
        throw new HttpException(`Room not found with id: ${id}`,HttpStatus.NOT_FOUND);
      }
      return room;
    }catch(e){
      throw new HttpException("Cannot find room", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateRoomDto: Prisma.RoomUpdateInput) {
    try{
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
    }catch(e){
      throw new HttpException("Cannot update room", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number) {
    try{
      const room = await this.databaseService.room.delete({
        where:{
          id,
        }
      });
      if(!room){
        throw new NotFoundException(`Room not found with id: ${id} to delete`);
      }
      return room;
    }catch(e){
      throw new HttpException("Cannot delete room", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
