import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../entities/song.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateSongDTO } from '../dto/update-song.dto';

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
