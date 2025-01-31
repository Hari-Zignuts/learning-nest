import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlayListDTO } from './dto/create-playlist.dto';
import { PlayList } from './entities/playlist.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private playListService: PlaylistsService) {}

  /**
   * @route POST /playlists
   * @description Create a new playlist
   * @param {CreatePlayListDTO} playlistDTO
   * @returns {Promise<{ message: string; data: PlayList }>}
   */
  @Post()
  create(
    @Body() playlistDTO: CreatePlayListDTO,
  ): Promise<{ message: string; data: PlayList }> {
    // call the service method to create a new playlist and return the response
    return this.playListService.create(playlistDTO);
  }
}
