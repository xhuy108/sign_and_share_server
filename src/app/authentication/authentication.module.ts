import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
} from 'src/common/strategies';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({}),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthenticationModule {}
