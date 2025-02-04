import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaylistsService } from './playlists.service';
import { CreatePlayListDTO } from './dto/create-playlist.dto';
import { PlayList } from './entities/playlist.entity';

@ApiTags('playlists')
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
  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiBody({ type: CreatePlayListDTO })
  @ApiResponse({
    status: 201,
    description: 'The playlist has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(
    @Body() playlistDTO: CreatePlayListDTO,
  ): Promise<{ message: string; data: PlayList }> {
    // call the service method to create a new playlist and return the response
    return this.playListService.create(playlistDTO);
  }
}
