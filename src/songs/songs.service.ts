import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song.dto';
import { Song } from './entities/song.entity';
import { SongRepository } from './repositories/song.repository';
import { UpdateSongDTO } from './dto/update-song.dto';

@Injectable()
export class SongsService {
  constructor(private readonly songRepository: SongRepository) {}

  async findAll(): Promise<{ message: string; data: Song[] }> {
    const data = await this.songRepository.findAllSongs();
    return {
      message: 'This action returns all songs',
      data,
    };
  }

  async findOne(id: number): Promise<{ message: string; data: Song }> {
    const data = await this.songRepository.findOneSong(id);
    return {
      message: `This action returns a song #${typeof id}`,
      data,
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

  async update(
    id: number,
    updateSongDTO: UpdateSongDTO,
  ): Promise<{ message: string }> {
    await this.songRepository.updateSong(id, updateSongDTO);
    return {
      message: `Song #${id} Updated Successfully!`,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.songRepository.deleteSong(id);
    return {
      message: `Song #${id} Deleted Successfully!`,
    };
  }
}
