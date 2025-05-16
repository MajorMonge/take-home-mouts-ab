import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, HttpCode, UseInterceptors, Inject } from '@nestjs/common';
import { CacheInterceptor, CacheTTL, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(Number(process.env.CACHE_TTL) ?? 600)
  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(Number(process.env.CACHE_TTL) ?? 600)
  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    await this.cacheManager.del(`/users/${id}`);
    await this.cacheManager.del('/users');
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'No content' })
  @ApiNotFoundResponse({ description: 'Not found' })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    await this.cacheManager.del(`/users/${id}`);
    await this.cacheManager.del('/users');
  }
}
