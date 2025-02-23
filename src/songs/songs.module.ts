import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongRepository } from './repositories/song.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { SongsService } from './songs.service';
import { ArtistsModule } from 'src/artists/artists.module';
import { RoleBaseGuard } from './guards/jwt-artist.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), ArtistsModule],
  controllers: [SongsController],
  providers: [SongsService, SongRepository, RoleBaseGuard],
  exports: [SongsService],
})
export class SongsModule {}
