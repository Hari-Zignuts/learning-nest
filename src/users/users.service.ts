import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userDTO: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.userRepository.createUser(userDTO);
    return user;
  }

  async findOne(data: Partial<User>): Promise<User> {
    if (!data.email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findUserByEmail(data.email);
    return user;
  }
}
