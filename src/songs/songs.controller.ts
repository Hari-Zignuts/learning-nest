import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';
import { Song } from './entities/song.entity';
import { UpdateSongDTO } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
  constructor(readonly songsService: SongsService) {}
  @Get()
  findAll(): Promise<{ message: string; data: Song[] }> {
    return this.songsService.findAll();
  }

  // default ParseIntPipe is used to parse the id parameter to a number (if it's not a number, it will throw an default error)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; data: Song }> {
    return this.songsService.findOne(id);
  }

  @Post()
  create(
    @Body() createSongDTO: CreateSongDTO,
  ): Promise<{ message: string; data: Song }> {
    return this.songsService.create(createSongDTO);
  }

  // custom ParseIntPipe is used to parse the id parameter to a number (if it's not a number, it will throw an custom error)
  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<{ message: string }> {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.songsService.remove(id);
  }
}
