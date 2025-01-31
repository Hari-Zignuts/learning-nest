import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { ResponseMessages } from 'src/common/constants/response-messages';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * @function create
   * @description Create a new user
   * @param {CreateUserDTO} userDTO
   * @returns {Promise<Omit<User, 'password'>>}
   */
  async create(
    userDTO: CreateUserDTO,
  ): Promise<{ message: string; data: Omit<User, 'password'> }> {
    // Hash the password
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    // Create the user in the database
    const data = await this.userRepository.createUser(userDTO);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = data;
    // retrun response without the password
    return { message: ResponseMessages.USER.CREATED, data: user };
  }

  /**
   * @function findOneByEmail
   * @description Find a user by email
   * @param {string} email
   * @returns {Promise<{ message: string; data: User }>}
   */
  async findOneByEmail(
    email: string,
  ): Promise<{ message: string; data: User }> {
    // Check if email is provided
    if (!email) {
      throw new HttpException(
        ResponseMessages.GENERAL.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Find user with password by email address in the database
    const user = await this.userRepository.findOneByEmail(email);
    // retrun response
    return { message: ResponseMessages.USER.FETCHED_ONE(user.id), data: user };
  }

  /**
   * @function findOneById
   * @description Find a user by id
   * @param {number} id
   * @returns {Promise<{ message: string; data: User }>}
   */
  async findOneById(id: number): Promise<{ message: string; data: User }> {
    if (!id) {
      throw new HttpException(
        ResponseMessages.GENERAL.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Find user by id in the database
    const user = await this.userRepository.findOneById(id);
    // retrun response
    return { message: ResponseMessages.USER.FETCHED_ONE(id), data: user };
  }
}
