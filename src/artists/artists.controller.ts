import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  /**
   * @route GET /artists/:id
   * @function findOneById
   * @description Find an artist by their ID
   * @param id
   * @returns Promise<{ message: string; data: Artist }>
   */
  @Get(':id')
  findOneById(
    @Body('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; data: Artist }> {
    // call the service method to find the artist by ID and return the response
    return this.artistsService.findOneById(id);
  }

  /**
   * @route POST /artists
   * @function create
   * @description Create a new artist
   * @param createArtistDTO
   * @returns Promise<{ message: string; data: Artist }>
   */
  @Post()
  create(
    @Body() createArtistDTO: CreateArtistDTO,
  ): Promise<{ message: string; data: Artist }> {
    // call the service method to create a new artist and return the response
    return this.artistsService.create(createArtistDTO);
  }
}
