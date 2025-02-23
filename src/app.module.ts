import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PlaylistsModule } from './playlists/playlists.module';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';
import { ConfigAppModule } from './config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PlaylistsModule,
    ArtistsModule,
    UsersModule,
    SongsModule,
    AuthModule,
    ConfigAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // check the database connection
  constructor(readonly dataSource: DataSource) {
    console.log(
      `Database connection to ${dataSource.driver.database}: ${dataSource.isConnected}`,
    );
  }

  // Middleware configuration
  configure(consumer: MiddlewareConsumer) {
    // Option - 1 // Apply middleware to a specific route in the songs module
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'songs',
    //   method: RequestMethod.GET,
    // });

    // Option - 2 // Apply middleware to all routes in the songs module
    consumer.apply(LoggerMiddleware).forRoutes('/');

    // Option - 3 // Apply middleware to a specific route in the songs controller
    // consumer.apply(LoggerMiddleware).forRoutes(SongsController);

    // Option - 4 // Apply middleware to all routes
    // consumer.apply(LoggerMiddleware).forRoutes('*');

    // Option - 5 // Apply middleware to all routes except the songs module
    // consumer.apply(LoggerMiddleware).exclude({ path: 'songs', method: RequestMethod.GET }).forRoutes('*');
  }
}
