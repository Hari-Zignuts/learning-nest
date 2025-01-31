import { In, Repository } from 'typeorm';
import { Song } from '../entities/song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationMeta } from 'src/common/interfaces/pagination-meta.interface';
import { ResponseMessages } from 'src/common/constants/response-messages';

@Injectable()
export class SongRepository {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  /**
   * @function create
   * @description Create a new song
   * @param song
   * @returns Promise<Song>
   */
  async create(song: Song): Promise<Song> {
    const data = await this.songRepository.save(song);
    if (!data) {
      throw new HttpException(
        ResponseMessages.SONG.CREATE_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return data;
  }

  /**
   * @function findAll
   * @description Find all songs in the database
   * @returns Promise<Song[]>
   */
  async findAll(): Promise<Song[]> {
    const data = await this.songRepository.find({
      relations: ['artists'],
    });
    if (!data || data.length === 0) {
      throw new HttpException(
        ResponseMessages.SONG.NOT_FOUND(),
        HttpStatus.NOT_FOUND,
      );
    }
    return data;
  }

  /**
   * @function findAllWithPaginationAndFilters
   * @description Find all songs with pagination and filters
   * @param params { page: number, limit: number, sort: boolean, search: string }
   * @returns Promise<{ items: Song[]; meta: PaginationMeta }>
   */
  async findAllWithPaginationAndFilters(
    page: number,
    limit: number,
    sort: boolean,
    search: string,
  ): Promise<{ items: Song[]; meta: PaginationMeta }> {
    const queryBuilder = this.songRepository.createQueryBuilder('song');
    // Search filter
    if (search) {
      queryBuilder.where('LOWER(song.title) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }
    // Sorting
    if (sort) {
      queryBuilder.orderBy('song.releaseDate', 'DESC');
    }
    // Pagination
    queryBuilder.skip((page - 1) * limit).take(limit);
    queryBuilder.leftJoinAndSelect('song.artists', 'artists');
    // Execute query
    const [items, total] = await queryBuilder.getManyAndCount();
    // Check if no items were found
    if (!items || !items.length) {
      throw new HttpException(
        ResponseMessages.SONG.NOT_FOUND(),
        HttpStatus.NOT_FOUND,
      );
    }
    const meta: PaginationMeta = {
      totalItems: total,
      itemCount: items.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
    return { items, meta };
  }

  /**
   * @function findManyByIds
   * @description Find many songs by their ids
   * @param ids
   * @returns Promise<Song[]>
   */
  async findManyByIds(ids: number[]): Promise<Song[]> {
    const songs = await this.songRepository.findBy({
      id: In(ids),
    });
    if (!songs || songs.length === 0) {
      throw new HttpException(
        ResponseMessages.SONG.NOT_FOUND(),
        HttpStatus.NOT_FOUND,
      );
    }
    return songs;
  }

  /**
   * @function findOneById
   * @description Find a song by its id
   * @param id
   * @returns Promise<Song>
   */
  async findOneById(id: number): Promise<Song> {
    const data = await this.songRepository.findOne({
      where: { id },
      relations: ['artists'],
    });
    if (!data) {
      throw new HttpException(
        ResponseMessages.SONG.NOT_FOUND(id),
        HttpStatus.NOT_FOUND,
      );
    }
    return data;
  }

  /**
   * @function updateOne
   * @description Update a song by its id
   * @param updateSong
   * @returns Promise<Song>
   */
  async updateOne(updateSong: Song): Promise<Song> {
    const data = await this.songRepository.save(updateSong);
    if (!data) {
      throw new HttpException(
        ResponseMessages.SONG.UPDATE_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return data;
  }

  /**
   * @function deleteOneById
   * @description Delete a song by its id
   * @param id
   * @returns Promise<void>
   */
  async deleteOneById(id: number): Promise<void> {
    const result = await this.songRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException(
        ResponseMessages.SONG.DELETE_FAILED(id),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
