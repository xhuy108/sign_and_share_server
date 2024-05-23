import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConstants } from './common/constants/env/env.constants';
import { DatabaseConfig } from './configs/database/database.config';
import { TransformationInterceptor } from './common/interceptors';
import { PostModule } from './app/post/post.module';
import { BlogModule } from './app/blog/blog.module';
import { AuthenticationModule } from './app/authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenJwtGuard } from './common/guards/access-token.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>(EnvConstants.mongoUri),
        dbName: 'sign_and_share',
      }),
      inject: [ConfigService],
    }),
    AuthenticationModule,
    PostModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenJwtGuard,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransformationInterceptor,
    },
  ],
})
export class AppModule {}
