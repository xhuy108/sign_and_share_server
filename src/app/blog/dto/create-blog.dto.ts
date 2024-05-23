import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsEmpty } from 'class-validator';

export class CreateBlogDto {
  // Not including user in the CreateBlogDto because the user will be extracted from the token
  @IsEmpty()
  user: string;

  @ApiProperty({
    description: 'The title of the blog',
    example: 'Top 5 places to visit in Vietnam',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the blog',
    example:
      'Vietnam is a beautiful country with many amazing places to visit. Here are the top 5 places to visit in Vietnam.',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The thumbnail of the blog',
    example:
      'https://bcp.cdnchinhphu.vn/344443456812359680/2022/11/7/anh-minh-hoa-bao-my-viet-nam-dang-vuot-xa-cac-nuoc-o-chau-a-ve-toc-do-tang-truong-1667815404896772093195.jpg',
    type: String,
    required: true,
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({
    description: 'The content of the blog',
    type: String,
    example:
      '<li>Ha Long Bay</li><li>Sapa</li><li>Hoi An</li><li>Da Nang</li><li>Ho Chi Minh City</li>',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
