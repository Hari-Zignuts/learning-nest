import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(readonly songsService: SongsService) {}
  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'my custom server error message',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  // default ParseIntPipe is used to parse the id parameter to a number (if it's not a number, it will throw an default error)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.songsService.findOne(id);
  }

  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
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
  ) {
    return this.songsService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
