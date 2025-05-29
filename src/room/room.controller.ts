import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { Prisma } from 'generated/prisma';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: Prisma.RoomCreateInput) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: Prisma.RoomUpdateInput) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
