import { INestApplication, Injectable } from '@nestjs/common';
import {
  SwaggerModule as NestSwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import * as packageJson from '../../../package.json'; // Import package.json

@Injectable()
export class SwaggerService {
  setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle(process.env.APP_NAME ?? 'NestJS API')
      .setDescription(process.env.APP_DESCRIPTION ?? 'NestJS API Description')
      .setVersion(process.env.APP_VERSION ?? packageJson.version)
      .build();

    const document = NestSwaggerModule.createDocument(app, config);
    NestSwaggerModule.setup('api/docs', app, document);
  }
}
