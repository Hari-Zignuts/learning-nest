import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { ResponseMessages } from 'src/common/constants/response-messages';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @function createUser
   * @description Create a new user
   * @param {CreateUserDTO} createUserDTO
   * @returns {Promise<Omit<User, 'password'>>}
   */
  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      // Save the user
      const newUser = await this.userRepository.save(createUserDTO);
      // Check if user was not created
      if (!newUser) {
        throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
      }
      return newUser;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new HttpException(
          'Email already in use. Please choose another one.',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  /**
   * @function findOneById
   * @description Find a user by id
   * @param {number} id
   * @returns {Promise<User>}
   */
  async findOneById(id: number): Promise<User> {
    // Find user by id
    const user = await this.userRepository.findOneBy({ id });
    // check if user exists
    if (!user) {
      throw new HttpException(
        ResponseMessages.USER.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    // return the user
    return user;
  }

  /**
   * @function findOneByEmail
   * @description Find a user by email
   * @param {string} email
   * @returns {Promise<User>}
   */
  async findOneByEmail(email: string): Promise<User> {
    // Find user by email
    const user = await this.userRepository.findOneBy({ email });
    // check if user exists
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // return the user
    return user;
  }
}
