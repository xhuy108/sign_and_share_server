import { ApiProperty } from '@nestjs/swagger';
import { BaseAuthDto } from './base-auth.dto';
import { IsStrongPassword } from 'class-validator';

export class SignInDto extends BaseAuthDto {
  @ApiProperty({
    description:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
    example: 'Password123!',
  })
  @IsStrongPassword()
  password: string;
}
