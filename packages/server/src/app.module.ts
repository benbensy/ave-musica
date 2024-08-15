import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { RoutingModule } from './routing/routing.module';

@Module({
  imports: [EventsModule, RoutingModule],
})
export class AppModule {}
