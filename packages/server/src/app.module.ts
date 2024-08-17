import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { RoutingModule } from './routing/routing.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    EventsModule,
    RoutingModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
})
export class AppModule {}
