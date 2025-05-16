import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  /**
   * Creates a new user in the database.
   * 
   * @param createUserDto - The data to create the user with.
   * @returns A promise that resolves to the created user record.
   */
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  /**
   * Retrieves all users from the database.
   * 
   * @returns A promise that resolves to an array of all user records.
   */
  findAll() {
    return this.prisma.user.findMany();
  }

  /**
   * Retrieves a user by their ID.
   * 
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the user record if found, or null if not found.
   */
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Updates a user by their ID.
   * 
   * @param id - The ID of the user to update.
   * @param updateUserDto - The data to update the user with.
   * @returns A promise that resolves to the updated user record.
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.findOne(id).catch((error) => {
      throw error;
    })
      .then((user) => {
        return this.prisma.user.update({
          where: { id: user.id },
          data: updateUserDto,
        })
      })
  }

  /**
   * Deletes a user by their ID.
   * 
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves to the deleted user record.
   */
  async remove(id: string) {
    return this.findOne(id).catch((error) => {
      throw error;
    })
      .then((user) => {
        return this.prisma.user.delete({
          where: { id: user.id },
        })
      })

  }
}
