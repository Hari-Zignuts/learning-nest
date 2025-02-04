import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateTokenDTO {
  @ApiProperty({
    description: 'The token to be validated',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
