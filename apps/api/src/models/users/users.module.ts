import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../providers/prisma/prisma.module';
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule,
  ],
})
export class UsersModule { }
