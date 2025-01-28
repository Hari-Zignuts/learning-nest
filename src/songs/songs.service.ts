import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song.dto';
import { Song } from './entities/song.entity';
import { SongRepository } from './repositories/song.repository';

@Injectable()
export class SongsService {
  constructor(private readonly songRepository: SongRepository) {}

  findAll() {
    throw new Error('Method not implemented.');
    return {
      message: 'This action returns all songs',
    };
  }

  findOne(id: number) {
    return {
      message: `This action returns a song #${typeof id}`,
    };
  }

  async create(
    createSongDTO: CreateSongDTO,
  ): Promise<{ message: string; data: Song }> {
    const song = new Song();
    song.title = createSongDTO.title;
    song.artists = createSongDTO.artists;
    song.duration = createSongDTO.duration;
    song.releaseDate = createSongDTO.releasedDate;
    song.lyrics = createSongDTO.lyrics || '';

    const data = await this.songRepository.createSong(song);
    return {
      message: 'Song Created Successfully!',
      data,
    };
  }

  update(id: number) {
    return {
      message: `Song #${typeof id} Updated Successfully!`,
    };
  }

  remove(id: string) {
    return {
      message: `Song #${id} Deleted Successfully!`,
    };
  }
}
