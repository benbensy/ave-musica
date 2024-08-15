import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HelperService } from 'src/helper/helper.service';
import { MusicService } from './music.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadMusicDto } from './music.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/music')
export class MusicController {
  constructor(
    private service: MusicService,
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  @Get('info')
  getMusicInfo() {}

  @Get('meta')
  getMusicMeta() {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMusic(
    @Headers('Range') range: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadMusicDto: UploadMusicDto,
  ) {
    console.log(uploadMusicDto.md5);

    const bytesRange = this.helper.getRange(range);
    if (bytesRange !== null) {
      this.service.saveFileChunk(file, bytesRange);
    }
  }
}
