import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common';
import * as debugModule from 'debug';

async function bootstrap() {
  const cors = require('cors');
  const corsOption = {
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    optionSuccessStatus: 200,  
  }
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe);

  const config = new DocumentBuilder()
                .setTitle('API Oinctober')
                .setDescription('API de gerencimanto do Oinctober!')
                .setVersion('1.0')
                .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const debug = debugModule('app:*');
  debug.enabled = true;

  app.use(cors(corsOption))
  app.listen(3001);
}
bootstrap();
