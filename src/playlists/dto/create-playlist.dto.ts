import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayListDTO {
  @ApiProperty({ description: 'The name of the playlist' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'The list of song IDs', type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: number[];

  @ApiProperty({ description: 'The ID of the user who created the playlist' })
  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
}
