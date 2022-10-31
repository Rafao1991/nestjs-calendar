import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    const where: Prisma.UserWhereUniqueInput = { id };
    return this.prisma.user.findUnique({
      where,
    });
  }

  async create(user: UserDTO): Promise<User> {
    const data: Prisma.UserCreateInput = {
      name: user.name.toLowerCase(),
      email: user.email.toLowerCase(),
    };
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: number, user: UserDTO): Promise<User> {
    const where: Prisma.UserWhereUniqueInput = { id };
    const currentUser = await this.findById(id);
    const data: Prisma.UserCreateInput = {
      name: user.name ? user.name.toLowerCase() : currentUser.name,
      email: user.email ? user.email.toLowerCase() : currentUser.email,
    };
    return this.prisma.user.update({
      where,
      data,
    });
  }

  async remove(id: number): Promise<User> {
    const where: Prisma.UserWhereUniqueInput = { id };
    return this.prisma.user.delete({
      where,
    });
  }
}
