import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayList } from './entities/playlist.entity';
import { User } from 'src/songs/entities/user.entity';
import { Song } from 'src/songs/entities/song.entity';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { PlaylistRepository } from './repositories/playlist.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlayList, User, Song])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, PlaylistRepository],
})
export class PlaylistsModule {}
