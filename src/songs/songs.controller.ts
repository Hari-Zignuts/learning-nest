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
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('songs')
@Controller('songs')
export class SongsController {
  constructor(readonly songsService: SongsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleBaseGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new song' })
  @ApiResponse({ status: 201, description: 'Song created successfully.' })
  @ApiBody({ type: CreateSongDTO })
  create(
    @Body() createSongDTO: CreateSongDTO,
  ): Promise<{ message: string; data: Song }> {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Find all songs' })
  @ApiResponse({ status: 200, description: 'Songs retrieved successfully.' })
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
    @Query('search') search: string = '',
  ): Promise<{
    message: string;
    data: { items: Song[]; meta: PaginationMeta };
  }> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 2;
    const sortBool = sort ? sort === 'true' : false;

    return this.songsService.findAllWithPaginationAndFilters(
      pageNumber,
      limitNumber,
      sortBool,
      search,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a song by its ID' })
  @ApiResponse({ status: 200, description: 'Song retrieved successfully.' })
  @ApiParam({ name: 'id', type: Number })
  findOneById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<{ message: string; data: Song }> {
    return this.songsService.findOneById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleBaseGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a song by its ID' })
  @ApiResponse({ status: 200, description: 'Song updated successfully.' })
  @ApiBody({ type: UpdateSongDTO })
  @ApiParam({ name: 'id', type: Number })
  updateOneById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<{ message: string; data: Song }> {
    return this.songsService.updateOneById(id, updateSongDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a song by its ID' })
  @ApiResponse({ status: 200, description: 'Song deleted successfully.' })
  @ApiParam({ name: 'id', type: Number })
  deleteOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.songsService.deleteOneById(id);
  }
}
