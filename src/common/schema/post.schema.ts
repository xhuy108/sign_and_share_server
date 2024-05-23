import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

@Schema({
  id: true,
  timestamps: true,
  versionKey: false,
})
export class Post {
  @Prop({ required: true, type: User })
  user: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [User], default: [] })
  likes: User[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
