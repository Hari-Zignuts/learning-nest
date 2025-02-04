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
  @ApiPropertyOptional({
    description: 'The title of the song',
    example: 'Shape of You',
  })
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiPropertyOptional({
    description: 'The IDs of the artists',
    example: [1, 2],
    type: [Number], // Make sure this is interpreted as an array of numbers
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists: number[];

  @ApiPropertyOptional({
    description: 'The release date of the song',
    example: '2021-08-01',
    type: String, // Define as a string
    format: 'date', // Make sure Swagger recognizes it as a date
  })
  @IsOptional()
  @IsDateString()
  readonly releasedDate: Date;

  @ApiPropertyOptional({
    description: 'The duration of the song in military time',
    example: '03:54',
    type: String, // Define as string
    format: 'time', // Swagger time format
  })
  @IsOptional()
  @IsMilitaryTime()
  readonly duration: Date;

  @ApiPropertyOptional({
    description: 'The lyrics of the song',
    example: "The club isn't the best place to find a lover...",
    type: String, // Define as string
  })
  @IsOptional()
  @IsString()
  readonly lyrics: string;
}
