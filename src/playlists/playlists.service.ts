import { Injectable } from '@nestjs/common';
import { CreatePlayListDTO } from './dto/playlist.dto';
import { PlayList } from './entities/playlist.entity';
import { PlaylistRepository } from './repositories/playlist.repository';
import { SongRepository } from 'src/songs/repositories/song.repository';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class PlaylistsService {
  constructor(
    private readonly playListRepository: PlaylistRepository,
    private readonly songsRepository: SongRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async create(playlistDTO: CreatePlayListDTO) {
    const playlist = new PlayList();
    playlist.name = playlistDTO.name;

    const songs = await this.songsRepository.findSongsByIds(playlistDTO.songs);
    playlist.songs = songs;

    const user = await this.userRepository.findUserById(playlistDTO.user);
    playlist.user = user;

    return this.playListRepository.createPlayList(playlist);
  }
}
