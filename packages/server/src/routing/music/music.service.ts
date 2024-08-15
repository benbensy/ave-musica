import { Injectable } from '@nestjs/common';

@Injectable()
export class MusicService {
  async saveFileChunk(file: Express.Multer.File, range: [number, number]) {
    console.log(file, range);
  }
}
