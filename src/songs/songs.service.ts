import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Song } from './entities/song.entity';
import { SongRepository } from './repositories/song.repository';

import { CreateSongDTO } from './dto/create-song.dto';
import { UpdateSongDTO } from './dto/update-song.dto';
import { ResponseMessages } from 'src/common/constants/response-messages';
import { PaginationMeta } from 'src/common/interfaces/pagination-meta.interface';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class SongsService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly artistsService: ArtistsService,
  ) {}

  /**
   * @function create
   * @description Create a new song
   * @param createSongDTO
   * @returns Promise<{ message: string; data: Song }>
   */
  async create(
    createSongDTO: CreateSongDTO,
  ): Promise<{ message: string; data: Song }> {
    // find the artists by their IDs
    const { data } = await this.artistsService.findManyByIds(
      createSongDTO.artists,
    );
    // Create a new song
    const song = new Song();
    song.title = createSongDTO.title;
    song.artists = data;
    song.duration = createSongDTO.duration;
    song.releaseDate = createSongDTO.releasedDate;
    song.lyrics = createSongDTO.lyrics || '';
    // Save the song to the database
    const createdSong = await this.songRepository.create(song);
    // Return the response
    return { message: ResponseMessages.SONG.CREATED, data: createdSong };
  }

  /**
   * @function findAll
   * @description Find all songs in the database
   * @param params { page: number, limit: number, sort: boolean, search: string }
   * @returns Promise<{ message: string; data: Song[] }>
   */
  async findAllWithPaginationAndFilters(
    page: number,
    limit: number,
    sort: boolean,
    search: string,
  ): Promise<{
    message: string;
    data: { items: Song[]; meta: PaginationMeta };
  }> {
    // Fetch all songs from the database
    const data = await this.songRepository.findAllWithPaginationAndFilters(
      page,
      limit,
      sort,
      search,
    );
    // return the response
    return { message: ResponseMessages.SONG.FETCHED, data };
  }

  /**
   * @function findManyByIds
   * @description Find many songs by their ids in the database
   * @param ids
   * @returns Promise<{ message: string; data: Song[] }>
   */
  async findManyByIds(
    ids: number[],
  ): Promise<{ message: string; data: Song[] }> {
    // Check if the ids array is empty
    if (!ids || !ids.length) {
      throw new HttpException(
        ResponseMessages.GENERAL.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Fetch all songs by their ids from the database
    const data = await this.songRepository.findManyByIds(ids);
    // return the response
    return { message: ResponseMessages.SONG.FETCHED, data };
  }

  /**
   * @function findOneById
   * @description Find a song by its id in the database
   * @param id
   * @returns Promise<{ message: string; data: Song }>
   */
  async findOneById(id: number): Promise<{ message: string; data: Song }> {
    // Check if the id is provided
    if (!id) {
      throw new HttpException(
        ResponseMessages.GENERAL.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Fetch the song by its id from the database
    const data = await this.songRepository.findOneById(id);
    // return the response
    return { message: ResponseMessages.SONG.FETCHED_ONE(id), data };
  }

  /**
   * @function updateOne
   * @description Update a song by its id in the database
   * @param id
   * @param updateSongDTO
   * @returns Promise<{ message: string; data: Song }>
   */
  async updateOneById(
    id: number,
    updateSongDTO: UpdateSongDTO,
  ): Promise<{ message: string; data: Song }> {
    // Check if the updateSongDTO is empty
    if (!updateSongDTO || !Object.keys(updateSongDTO).length) {
      throw new HttpException(
        ResponseMessages.SONG.NO_DATA_PROVIDED,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Fetch the song by its id from the database
    const song = await this.songRepository.findOneById(id);
    // assign the updated values to the song object
    Object.assign(song, updateSongDTO);
    // Check if the artists array is provided
    if (updateSongDTO.artists) {
      const { data } = await this.artistsService.findManyByIds(
        updateSongDTO.artists,
      );
      song.artists = data;
    }
    // Update the song in the database
    const updatedSong = await this.songRepository.updateOne(song);
    // return the response
    return {
      message: ResponseMessages.SONG.UPDATED(id),
      data: updatedSong,
    };
  }

  /**
   * @function deleteOneById
   * @description Delete a song by its id in the database
   * @param id
   * @returns Promise<{ message: string }>
   */
  async deleteOneById(id: number): Promise<{ message: string }> {
    // Check if the id is provided
    if (!id) {
      throw new HttpException(
        ResponseMessages.GENERAL.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Delete the song by its id from the database
    await this.songRepository.deleteOneById(id);
    // return the response
    return {
      message: ResponseMessages.SONG.DELETED(id),
    };
  }
}
