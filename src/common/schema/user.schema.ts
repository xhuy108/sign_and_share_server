import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  id: true,
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: false, select: false })
  verificationToken: string;

  @Prop({ default: null })
  verificationAt: Date | null;

  @Prop({ default: null })
  name: string | null;

  @Prop({ default: null })
  dateOfBirth: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
