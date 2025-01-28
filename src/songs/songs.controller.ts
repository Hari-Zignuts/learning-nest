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
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';
import { Song } from './entities/song.entity';
import { UpdateSongDTO } from './dto/update-song.dto';
import { PaginationMeta } from 'src/common/interfaces/pagination-meta.interface';

@Controller('songs')
export class SongsController {
  constructor(readonly songsService: SongsService) {}
  @Get()
  findAll(
    @Query('page') page?: string, // Optional, default will be handled
    @Query('limit') limit?: string, // Optional, default will be handled
    @Query('sort') sort?: string, // Optional, default will be handled
    @Query('search') search: string = '', // Optional, default to empty string
  ): Promise<{
    message: string;
    data: {
      items: Song[];
      meta: PaginationMeta;
    };
  }> {
    // Convert optional parameters to defaults or required types
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 2;
    const sortBool = sort ? sort === 'true' : false;

    return this.songsService.findAll(pageNumber, limitNumber, sortBool, search);
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
