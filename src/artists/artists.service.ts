import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistRepository } from './repositories/artist.repository';
import { Artist } from './entities/artist.entity';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UsersService } from 'src/users/users.service';
import { ResponseMessages } from 'src/common/constants/response-messages';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly userService: UsersService,
  ) {}

  /**
   * @function create
   * @description Create a new artist
   * @param createArtistDTO
   * @returns Promise<{ message: string; data: Artist }>
   */
  async create(
    createArtistDTO: CreateArtistDTO,
  ): Promise<{ message: string; data: Artist }> {
    // find the user by ID
    const { data } = await this.userService.findOneById(createArtistDTO.user);
    // create a new artist
    const artist = await this.artistRepository.create(data);
    // return response
    return { message: ResponseMessages.ARTIST.CREATED, data: artist };
  }

  /**
   * @function findManyByIds
   * @description Find artists by their IDs
   * @param ids
   * @returns Promise<{ message: string; data: Artist[] }>
   */
  async findManyByIds(
    ids: number[],
  ): Promise<{ message: string; data: Artist[] }> {
    // check if the IDs array is empty
    if (!ids || ids.length === 0) {
      throw new HttpException(
        ResponseMessages.GENERAL.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Find artists by their IDs and return the result
    const data = await this.artistRepository.findManyByIds(ids);
    // return response
    return { message: ResponseMessages.ARTIST.FETCHED, data };
  }

  /**
   * @function findOneById
   * @description Find an artist by their ID
   * @param id
   * @returns Promise<{ message: string; data: Artist }>
   */
  async findOneById(id: number): Promise<{ message: string; data: Artist }> {
    // check if the ID is not provided
    if (!id) {
      throw new HttpException(
        ResponseMessages.GENERAL.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Find the artist by their ID and return the result
    const artist = await this.artistRepository.findOneById(id);
    // return response
    return { message: ResponseMessages.ARTIST.FETCHED_ONE(id), data: artist };
  }

  async findOneByUserId(
    userId: number,
  ): Promise<{ message: string; data: Artist }> {
    // Find an artist by their ID from the database
    const artist = await this.artistRepository.findOneByUserId(userId);
    // Return the artist
    return {
      message: ResponseMessages.ARTIST.FETCHED_ONE(userId),
      data: artist,
    };
  }
}
