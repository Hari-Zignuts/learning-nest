import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlayListDTO } from './dto/create-playlist.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private playListService: PlaylistsService) {}

  @Post()
  create(@Body() playlistDTO: CreatePlayListDTO) {
    return this.playListService.create(playlistDTO);
  }
}
