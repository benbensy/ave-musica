import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/events/events.gateway';
import { MusicModule } from './music/music.module';
import { HelperModule } from 'src/helper/helper.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [HelperModule, PrismaModule, MusicModule],
  providers: [EventsGateway],
})
export class RoutingModule {}
