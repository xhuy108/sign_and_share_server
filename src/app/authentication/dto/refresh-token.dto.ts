import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsJWT } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'JWT refresh token to refresh access token',
  })
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
