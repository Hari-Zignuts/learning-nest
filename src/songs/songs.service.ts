import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Song } from './entities/song.entity';
import { SongRepository } from './repositories/song.repository';

import { PaginationMeta } from 'src/common/interfaces/pagination-meta.interface';
import { ArtistRepository } from 'src/artists/repositories/artist.repository';
import { CreateSongDTO } from './dto/create-song.dto';
import { UpdateSongDTO } from './dto/update-song.dto';

@Injectable()
export class SongsService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  async findAll(
    page: number,
    limit: number,
    sort: boolean,
    search: string,
  ): Promise<{
    message: string;
    data: {
      items: Song[];
      meta: PaginationMeta;
    };
  }> {
    // const data = await this.songRepository.findAllSongs();
    const { items, meta } = await this.songRepository.paginateAndFilter(
      page,
      limit,
      sort,
      search,
    );
    return {
      message: 'This action returns all songs',
      data: {
        items,
        meta,
      },
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
    const artists = await this.artistRepository.findArtistsByIds(
      createSongDTO.artists,
    );

    const song = new Song();
    song.title = createSongDTO.title;
    song.artists = artists;
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
  ): Promise<{ message: string; data: Song }> {
    if (!updateSongDTO || !Object.keys(updateSongDTO).length) {
      throw new HttpException('No data provided', HttpStatus.BAD_REQUEST, {
        cause: 'No data provided',
      });
    }
    const updateSong = await this.songRepository.findOneSong(id);
    Object.assign(updateSong, updateSongDTO);
    if (updateSongDTO.artists) {
      const artists = await this.artistRepository.findArtistsByIds(
        updateSongDTO.artists,
      );
      updateSong.artists = artists;
    }
    const data = await this.songRepository.updateSong(updateSong);
    return {
      message: `Song #${id} Updated Successfully!`,
      data,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.songRepository.deleteSong(id);
    return {
      message: `Song #${id} Deleted Successfully!`,
    };
  }
}
