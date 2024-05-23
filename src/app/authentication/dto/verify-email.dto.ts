import { IsNotEmpty, IsString } from 'class-validator';
import { BaseAuthDto } from './base-auth.dto';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto extends BaseAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Token to verify email',
    example: 'token',
  })
  token: string;
}
