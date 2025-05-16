import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerService } from './providers/swagger/swagger.service';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { LoggerService } from './providers/logger/logger.service';

import * as dotenv from "dotenv"

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggerService);
  app.setGlobalPrefix('api');
  app.useLogger(logger);
  app.enableCors();

  const swaggerService = app.get(SwaggerService);
  swaggerService.setup(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.BACKEND_PORT ?? 3000);

  logger.log(`API is running on: ${await app.getUrl()}`);
  logger.log(`API documentation is available at: ${await app.getUrl()}/api/docs`);
}
bootstrap();
