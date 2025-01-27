import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song.dto';

@Injectable()
export class SongsService {
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

  create(createSongDTO: CreateSongDTO) {
    return {
      message: 'Song Created Successfully!',
      data: createSongDTO,
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
