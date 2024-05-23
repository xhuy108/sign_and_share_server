import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static config(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Sign and Share API')
      .setDescription('API for Sign and Share')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      })
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/', app, document);
  }
}
