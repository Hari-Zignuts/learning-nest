import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../entities/song.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SongRepository {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async createSong(song: Song): Promise<Song> {
    return await this.songRepository.save(song);
  }
}
