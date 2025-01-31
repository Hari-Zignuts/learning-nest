import { IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateArtistDTO {
  @IsNumber()
  user: number; // Associate artist with an existing user

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  songIds?: number[]; // Optional array of song IDs
}
