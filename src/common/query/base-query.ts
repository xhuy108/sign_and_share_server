import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseQuery {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'The page number',
    example: 1,
    type: Number,
    required: false,
    default: 1,
  })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'The number of items per page',
    example: 20,
    type: Number,
    required: false,
    default: 20,
  })
  limit?: number = 20;

  @IsOptional()
  @IsString()
  order?: string;
}
