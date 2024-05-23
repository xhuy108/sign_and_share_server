import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class BaseAuthDto {
  @IsEmail()
  @IsString()
  @ApiProperty({
    description: 'Email of the user',
    example: 'abc@abc.com',
  })
  email: string;
}
