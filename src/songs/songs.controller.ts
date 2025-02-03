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
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './entities/song.entity';
import { PaginationMeta } from 'src/common/interfaces/pagination-meta.interface';
import { CreateSongDTO } from './dto/create-song.dto';
import { UpdateSongDTO } from './dto/update-song.dto';
import { RoleBaseGuard } from './guards/jwt-artist.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('songs')
export class SongsController {
  constructor(readonly songsService: SongsService) {}

  /**
   * @route POST /songs
   * @function create
   * @description Create a new song
   * @param createSongDTO
   * @returns Promise<{ message: string; data: Song }>
   */
  @Post()
  @UseGuards(JwtAuthGuard, RoleBaseGuard)
  create(
    @Body() createSongDTO: CreateSongDTO,
  ): Promise<{ message: string; data: Song }> {
    // Call the service method to create a new song and return the response
    return this.songsService.create(createSongDTO);
  }

  /**
   * @route GET /songs
   * @function findAll
   * @description Find all songs in the database
   * @param params { page: number, limit: number, sort: boolean, search: string } - optional query parameters
   * @returns Promise<{ message: string; data: Song[] }>
   */
  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
    @Query('search') search: string = '',
  ): Promise<{
    message: string;
    data: { items: Song[]; meta: PaginationMeta };
  }> {
    // Convert optional parameters to defaults or required types
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 2;
    const sortBool = sort ? sort === 'true' : false;

    // Call the service method to fetch songs and return the response
    return this.songsService.findAllWithPaginationAndFilters(
      pageNumber,
      limitNumber,
      sortBool,
      search,
    );
  }

  /**
   * @route GET /songs/:id
   * @function findOneById
   * @description Find a song by its ID
   * @param id - parsed to a number using ParseIntPipe (if it's not a number, it will throw an error)
   * @returns Promise<{ message: string; data: Song }>
   */
  @Get(':id')
  findOneById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<{ message: string; data: Song }> {
    // Call the service method to fetch a song by its ID and return the response
    return this.songsService.findOneById(id);
  }

  /**
   * @route PUT /songs/:id
   * @function updateOneById
   * @description Update a song by its ID
   * @param id - parsed to a number using ParseIntPipe (if it's not a number, it will throw an error)
   * @param updateSongDTO
   * @returns Promise<{ message: string; data: Song }>
   */
  @Put(':id')
  updateOneById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<{ message: string; data: Song }> {
    // Call the service method to update a song by its ID and return the response
    return this.songsService.updateOneById(id, updateSongDTO);
  }

  /**
   * @route DELETE /songs/:id
   * @function deleteOneById
   * @description Delete a song by its ID
   * @param id - parsed to a number using ParseIntPipe (if it's not a number, it will throw an error)
   * @returns Promise<{ message: string }>
   */
  @Delete(':id')
  deleteOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    // Call the service method to delete a song by its ID and return the response
    return this.songsService.deleteOneById(id);
  }
}
