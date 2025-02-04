import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Artist } from '../entities/artist.entity';
import { User } from 'src/users/entities/user.entity';
import { ResponseMessages } from 'src/common/constants/response-messages';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  /**
   * @function create
   * @description Create a new artist
   * @param user
   * @returns Promise<Artist>
   */
  async create(user: User): Promise<Artist> {
    // Check if the user is already an artist
    const existingArtist = await this.artistRepository.findOneBy({ user });
    if (existingArtist) {
      throw new HttpException(
        ResponseMessages.ARTIST.EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Create a new artist with the user
    const artist = await this.artistRepository.save({ user });
    // Throw an error if the artist is not created
    if (!artist) {
      throw new HttpException(
        ResponseMessages.ARTIST.CREATE_FAILED,
        HttpStatus.NOT_FOUND,
      );
    }
    // Return the created artist
    return artist;
  }

  /**
   * @function findManyByIds
   * @description Find artists by their IDs
   * @param ids
   * @returns Promise<Artist[]>
   */
  async findManyByIds(ids: number[]): Promise<Artist[]> {
    // Find artists by their IDs
    const artists = await this.artistRepository.findBy({
      id: In(ids),
    });
    // Throw an error if no artists are found
    if (!artists || artists.length === 0) {
      throw new HttpException(
        ResponseMessages.ARTIST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    // Return the artists
    return artists;
  }

  /**
   * @function findOneById
   * @description Find an artist by their ID
   * @param id
   * @returns Promise<Artist>
   */
  async findOneById(id: number): Promise<Artist> {
    // Find an artist by their ID from the database
    const artist = await this.artistRepository.findOneBy({ id });
    // check if the artist exists
    if (!artist) {
      throw new HttpException(
        ResponseMessages.ARTIST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    // Return the artist
    return artist;
  }

  async findOneByUserId(id: number): Promise<Artist> {
    // Find an artist by their ID from the database
    const artist = await this.artistRepository.findOneBy({ user: { id } });
    // check if the artist exists
    if (!artist || !artist.id) {
      throw new HttpException(
        ResponseMessages.ARTIST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    // Return the artist
    return artist;
  }

  async findAll(): Promise<Artist[]> {
    // Find all artists from the database
    const artists = await this.artistRepository.find({});
    // Return the artists
    return artists;
  }
}
