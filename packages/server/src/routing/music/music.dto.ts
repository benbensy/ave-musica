import { IsNotEmpty } from 'class-validator';

export class UploadMusicDto {
  @IsNotEmpty()
  md5!: string;
}
