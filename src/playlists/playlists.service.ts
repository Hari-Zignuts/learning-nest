import { Injectable } from '@nestjs/common';
import { CreatePlayListDTO } from './dto/create-playlist.dto';
import { PlayList } from './entities/playlist.entity';
import { PlaylistRepository } from './repositories/playlist.repository';
import { UsersService } from 'src/users/users.service';
import { SongsService } from 'src/songs/songs.service';
import { ResponseMessages } from 'src/common/constants/response-messages';

@Injectable()
export class PlaylistsService {
  constructor(
    private readonly playListRepository: PlaylistRepository,
    private readonly songsService: SongsService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * @function create
   * @description Create a new playlist
   * @param {CreatePlayListDTO} playlistDTO - The playlist data
   * @returns {Promise<{ message: string; data: PlayList }>} - The response message and data
   */
  async create(
    playlistDTO: CreatePlayListDTO,
  ): Promise<{ message: string; data: PlayList }> {
    const songs = await this.songsService.findManyByIds(playlistDTO.songs);
    const user = await this.usersService.findOneById(playlistDTO.user);
    // Create a new playlist
    const playlist = new PlayList();
    playlist.name = playlistDTO.name;
    playlist.songs = songs.data;
    playlist.user = user.data;
    // Save the playlist
    const playList = await this.playListRepository.createPlayList(playlist);
    // Return the response
    return { message: ResponseMessages.PLAYLIST.CREATED, data: playList };
  }
}
