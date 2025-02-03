import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSongDTO {
  @ApiPropertyOptional({ description: 'The title of the song' })
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiPropertyOptional({
    description: 'The IDs of the artists',
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists: number[];

  @ApiPropertyOptional({ description: 'The release date of the song' })
  @IsOptional()
  @IsDateString()
  readonly releasedDate: Date;

  @ApiPropertyOptional({
    description: 'The duration of the song in military time',
  })
  @IsOptional()
  @IsMilitaryTime()
  readonly duration: Date;

  @ApiPropertyOptional({ description: 'The lyrics of the song' })
  @IsOptional()
  @IsString()
  readonly lyrics: string;
}
