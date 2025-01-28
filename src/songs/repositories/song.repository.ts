import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../entities/song.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateSongDTO } from '../dto/update-song.dto';
import { PaginationMeta } from 'src/common/interfaces/pagination-meta.interface';

@Injectable()
export class SongRepository {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
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
    const data = await this.songRepository.find();
    if (!data) {
      throw new HttpException('Songs not found', HttpStatus.NOT_FOUND, {
        cause: 'No songs found',
      });
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
    const data = await this.songRepository.findOneBy({ id });
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

  async updateSong(id: number, song: UpdateSongDTO): Promise<void> {
    if (!song || !Object.keys(song).length) {
      throw new HttpException('No data provided', HttpStatus.BAD_REQUEST, {
        cause: 'No data provided',
      });
    }

    const data = await this.songRepository.update({ id }, song);
    if (data.affected === 0) {
      throw new HttpException(
        `Song not found with id:${id}`,
        HttpStatus.NOT_FOUND,
        {
          cause: 'Song not found',
        },
      );
    }
  }
}
