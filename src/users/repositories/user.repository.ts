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

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async createUser(
    createUserDTO: CreateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    try {
      const newUser = await this.userRepository.save(createUserDTO);
      if (!newUser) {
        throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = newUser;
      return result;
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
}
