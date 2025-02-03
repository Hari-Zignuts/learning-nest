import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the song',
    example: 'Shape of You',
  })
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'The genre IDs of the song',
    example: [1, 2],
    type: [Number], // Make sure this is interpreted as an array of numbers
  })
  @IsNumber({}, { each: true })
  readonly artists: number[];

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: 'The release date of the song',
    example: '2021-08-01',
    type: String, // Define as a string
    format: 'date', // Make sure Swagger recognizes it as a date
  })
  readonly releasedDate: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  @ApiProperty({
    description: 'The duration of the song',
    example: '00:03:54',
    type: String, // Define as string
    format: 'time', // Swagger time format
  })
  readonly duration: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The lyrics of the song',
    example: "The club isn't the best place to find a lover...",
    type: String, // Define as string
  })
  readonly lyrics: string;
}
