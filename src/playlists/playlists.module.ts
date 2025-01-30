import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { PlaylistRepository } from './repositories/playlist.repository';
import { PlayList } from './entities/playlist.entity';
import { SongsModule } from 'src/songs/songs.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlayList]), SongsModule, UsersModule],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, PlaylistRepository],
})
export class PlaylistsModule {}
