import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/schema/user.schema';
import { Blog } from './entities/blog.entity';
import { BlogQuery } from './dto/blog-query.dto';
import Paging from 'src/common/types/paging.type';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(User.name) private userModel: Model<UpdateBlogDto>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    return this.blogModel.create(createBlogDto);
  }

  async findAll(blogQuery: BlogQuery): Promise<Paging<Blog>> {
    const page = blogQuery.page || 1;
    const limit = blogQuery.limit || 20;
    const result = await Promise.all([
      this.blogModel
        .find()
        .populate('user')
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.blogModel.countDocuments().exec(),
    ]);

    return {
      page: page,
      limit: limit,
      totalPages: Math.ceil(result[1] / limit),
      items: result[0],
    };
  }

  async findOne(id: string) {
    // return this.blogModel.findById(id).exec();
    const result = await this.blogModel.findById(id).populate('user').exec();
    if (!result) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return result;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const result = await this.blogModel
      .findByIdAndUpdate(id, { $set: updateBlogDto }, { new: true })
      .populate('user')
      .exec();

    if (!result) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.blogModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
  }
}
