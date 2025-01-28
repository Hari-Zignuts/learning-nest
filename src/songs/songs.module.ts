import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SongRepository } from './repositories/song.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [SongsService, SongRepository],
})
export class SongsModule {}
