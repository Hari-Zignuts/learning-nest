import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistsService } from './artists.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';

@ApiTags('artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  /**
   * @route GET /artists/:id
   * @function findOneById
   * @description Find an artist by their ID
   * @param id
   * @param type
   * @returns Promise<{ message: string; data: Artist }>
   */
  @ApiOperation({ summary: 'Find an artist by their ID' })
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully found.',
  })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  @Get(':id')
  findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; data: Artist }> {
    return this.artistsService.findOneById(id);
  }

  /**
   * @route POST /artists
   * @function create
   * @description Create a new artist
   * @param createArtistDTO
   * @returns Promise<{ message: string; data: Artist }>
   */
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiBody({ type: CreateArtistDTO })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post()
  create(
    @Body() createArtistDTO: CreateArtistDTO,
  ): Promise<{ message: string; data: Artist }> {
    // call the service method to create a new artist and return the response
    return this.artistsService.create(createArtistDTO);
  }
}
