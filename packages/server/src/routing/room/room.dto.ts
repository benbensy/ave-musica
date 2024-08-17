import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  roomName: string;
}
