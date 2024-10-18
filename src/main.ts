import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.APP_PREFIX + '/geo')


    const config = new DocumentBuilder()
   . setTitle('Geo API')
    .setDescription('description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

   SwaggerModule.setup(process.env.APP_PREFIX + '/geo/doc', app, document);

  await app.listen(process.env.PORT);
  app.enableCors()
  app.use(json({ limit: '50mb' }))
}
bootstrap();
