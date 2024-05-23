import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Types } from 'mongoose';

@Schema({
  id: true,
  timestamps: true,
  versionKey: false,
})
export class Blog {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  content: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
