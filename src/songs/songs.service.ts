import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song.dto';

@Injectable()
export class SongsService {
  findAll() {
    return {
      message: 'This action returns all songs',
    };
  }

  findOne(id: string) {
    return {
      message: `This action returns a song #${id}`,
    };
  }

  create(createSongDTO: CreateSongDTO) {
    return {
      message: 'Song Created Successfully!',
      data: createSongDTO,
    };
  }

  update(id: string) {
    return {
      message: `Song #${id} Updated Successfully!`,
    };
  }

  remove(id: string) {
    return {
      message: `Song #${id} Deleted Successfully!`,
    };
  }
}
