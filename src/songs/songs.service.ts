import { Injectable } from '@nestjs/common';

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

  create() {
    return {
      message: 'Song Created Successfully!',
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
