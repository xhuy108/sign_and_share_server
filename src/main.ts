import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './configs/docs/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig.config(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
