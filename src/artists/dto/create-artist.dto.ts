import { IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArtistDTO {
  @ApiProperty({ description: 'Associate artist with an existing user' })
  @IsNumber()
  user: number; // Associate artist with an existing user

  @ApiPropertyOptional({
    description: 'Optional array of song IDs',
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  songIds?: number[]; // Optional array of song IDs
}
