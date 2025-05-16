import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaModule } from './providers/prisma/prisma.module';
import { SwaggerModule } from './providers/swagger/swagger.module';
import { UsersModule } from './models/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerModule } from './providers/logger/logger.module';
import KeyvRedis from '@keyv/redis';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    PrismaModule,
    SwaggerModule,
    LoggerModule,
    UsersModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.colorize(),
            winston.format.printf(
              info => `${info.timestamp} ${info.level}: ${info.message}`
            )
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.json()
          ),
        }),
        new winston.transports.File({
          filename: `${process.env.LOG_FILE || 'logs/api.log'}`,
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.json()
          ),
        }),
      ],
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
      ),
      level: process.env.LOG_LEVEL || 'info',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          store: new KeyvRedis(process.env.REDIS_URL, {
            namespace: 'cache',
          })
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }
