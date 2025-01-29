import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayListDTO } from './dto/create-playlist.dto';
import { PlayList } from './entities/playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/songs/entities/user.entity';
import { In, Repository } from 'typeorm';
import { PlaylistRepository } from './repositories/playlist.repository';
import { Song } from 'src/songs/entities/song.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    private readonly playListRepository: PlaylistRepository,
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(playlistDTO: CreatePlayListDTO) {
    const playlist = new PlayList();
    playlist.name = playlistDTO.name;

    const songs = await this.songsRepository.findBy({
      id: In(playlistDTO.songs),
    });
    playlist.songs = songs;

    const user = await this.usersRepository.findOne({
      where: { id: playlistDTO.user },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    playlist.user = user;

    return this.playListRepository.createPlayList(playlist);
  }
}
