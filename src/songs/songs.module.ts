import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongRepository } from './repositories/song.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { SongsService } from './songs.service';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), ArtistsModule],
  controllers: [SongsController],
  providers: [SongsService, SongRepository],
  exports: [SongsService],
})
export class SongsModule {}
