import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../entities/song.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationMeta } from 'src/common/interfaces/pagination-meta.interface';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class SongRepository {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    private readonly artistRepository: ArtistRepository,
  ) {}

  async createSong(song: Song): Promise<Song> {
    const data = await this.songRepository.save(song);
    if (!data) {
      throw new HttpException('Song not created', HttpStatus.BAD_REQUEST, {
        cause: 'Song not created',
      });
    }
    return data;
  }

  async findAllSongs(): Promise<Song[]> {
    const data = await this.songRepository.find({
      relations: ['artists'],
    });

    if (!data || data.length === 0) {
      throw new HttpException('Songs not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async paginateAndFilter(
    page: number,
    limit: number,
    sort: boolean,
    search: string,
  ): Promise<{
    items: Song[];
    meta: PaginationMeta;
  }> {
    const queryBuilder = this.songRepository.createQueryBuilder('song');
    // Search filter
    if (search) {
      queryBuilder.where('LOWER(song.title) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    // Sorting
    if (sort) {
      queryBuilder.orderBy('song.title', 'ASC'); // Example sorting by title (you can customize this)
    }

    // Pagination
    queryBuilder.skip((page - 1) * limit).take(limit);

    queryBuilder.leftJoinAndSelect('song.artists', 'artists');
    const [items, total] = await queryBuilder.getManyAndCount();
    if (!items || !items.length) {
      throw new HttpException('Songs not found', HttpStatus.NOT_FOUND, {
        cause: 'No songs found',
      });
    }
    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findOneSong(id: number): Promise<Song> {
    const data = await this.songRepository.findOne({
      where: { id },
      relations: ['artists'],
    });
    if (!data) {
      throw new HttpException(
        `Song not found with id:${id}`,
        HttpStatus.NOT_FOUND,
        {
          cause: 'Song not found',
        },
      );
    }
    return data;
  }

  async deleteSong(id: number): Promise<void> {
    const result = await this.songRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException(
        `Song not found with id:${id}`,
        HttpStatus.NOT_FOUND,
        {
          cause: 'Song not found',
        },
      );
    }
  }

  async updateSong(updateSong: Song): Promise<Song> {
    const data = await this.songRepository.save(updateSong);
    if (!data) {
      throw new HttpException('Song not updated', HttpStatus.BAD_REQUEST, {
        cause: 'Song not updated',
      });
    }
    return data;
  }
}
