import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';

const validateId = (id: number) => {
  if (!id) {
    throw new BadRequestException('Id must be provided');
  }
};

const validateUser = (user: UserDTO) => {
  if (!user.name || user.name.split(' ').length < 2) {
    throw new BadRequestException('Name must contain first and last name');
  }

  if (
    !user.email ||
    user.email.split('@').length < 2 ||
    !user.email.includes('.com')
  ) {
    throw new BadRequestException('Email must be valid');
  }
};

const validateUserUpdate = (user: UserDTO) => {
  if (!user.name && !user.email) {
    throw new BadRequestException('Name or email must be provided');
  }

  if (user.name && user.name.split(' ').length < 2) {
    throw new BadRequestException('Name must contain first and last name');
  }

  if (
    user.email &&
    (user.email.split('@').length < 2 || !user.email.includes('.com'))
  ) {
    throw new BadRequestException('Email must be valid');
  }
};

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  findById(id: number): Promise<User | null> {
    validateId(id);
    return this.repository.findById(id);
  }

  create(user: UserDTO): Promise<User> {
    validateUser(user);
    return this.repository.create(user);
  }

  update(id: number, user: UserDTO): Promise<User> {
    validateId(id);
    validateUserUpdate(user);
    return this.repository.update(id, user);
  }

  remove(id: number): Promise<User> {
    validateId(id);
    return this.repository.remove(id);
  }
}
