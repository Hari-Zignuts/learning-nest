import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayList } from '../entities/playlist.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(PlayList)
    private readonly playlistRepository: Repository<PlayList>,
  ) {}

  // Add a new method to find playlists by their IDs
  async findPlaylistsByIds(ids: number[]): Promise<PlayList[]> {
    // Implement this method to find playlists by their IDs
    const playlists = await this.playlistRepository.find({
      where: { id: In(ids) },
    });
    if (!playlists || playlists.length === 0) {
      throw new HttpException('Playlists not found', HttpStatus.NOT_FOUND);
    }
    return playlists;
  }

  async createPlayList(newPlayList: PlayList): Promise<PlayList> {
    const result = await this.playlistRepository.save(newPlayList);
    if (!result) {
      throw new HttpException(
        'Failed to create playlist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
