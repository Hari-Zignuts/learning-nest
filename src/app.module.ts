import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { SongsController } from './songs/songs.controller';

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Option - 1 // Apply middleware to a specific route in the songs module
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'songs',
      method: RequestMethod.GET,
    });

    // Option - 2 // Apply middleware to all routes in the songs module
    // consumer.apply(LoggerMiddleware).forRoutes('songs');

    // Option - 3 // Apply middleware to a specific route in the songs controller
    // consumer.apply(LoggerMiddleware).forRoutes(SongsController);

    // Option - 4 // Apply middleware to all routes
    // consumer.apply(LoggerMiddleware).forRoutes('*');

    // Option - 5 // Apply middleware to all routes except the songs module
    // consumer.apply(LoggerMiddleware).exclude({ path: 'songs', method: RequestMethod.GET }).forRoutes('*');
  }
}
