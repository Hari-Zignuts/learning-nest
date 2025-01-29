import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../entities/artist.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  // Find artists by their IDs (updated to use the 'In' operator)
  async findArtistsByIds(ids: number[]): Promise<Artist[]> {
    const artists = await this.artistRepository.findBy({
      id: In(ids), // Using 'In' operator to find artists with the given IDs
    });
    if (!artists || artists.length === 0) {
      throw new HttpException('Artists not found', HttpStatus.NOT_FOUND);
    }
    return artists;
  }
}
