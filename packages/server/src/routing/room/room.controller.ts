import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoomDto } from './room.dto';

@Controller('/room')
export class RoomController {
  constructor() {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return createRoomDto.roomName;
  }
}
