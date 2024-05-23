import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlogQuery } from './dto/blog-query.dto';

@Controller('blog')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiBearerAuth()
  create(
    @GetCurrentUserId() userId: string,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    return this.blogService.create({
      ...createBlogDto,
      user: userId,
    });
  }

  @Get()
  @Public()
  async findAll(@Query() query: BlogQuery) {
    // return this.blogService.findAll(query);
    const result = await this.blogService.findAll(query);
    return result;
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @GetCurrentUserId() userId: string,
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogService.update(id, {
      ...updateBlogDto,
      user: userId,
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
