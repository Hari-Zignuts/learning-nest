import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ResponseMessages } from 'src/common/constants/response-messages';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { PayloadType } from 'src/common/interfaces/payload.interface';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly artistsService: ArtistsService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @function login
   * @description Login a user
   * @param loginDTO
   * @returns Promise<{ access_token: string }>
   */
  async login(
    loginDTO: LoginDTO,
  ): Promise<{ message: string; access_token: string }> {
    // Find the user by email address
    const user = await this.usersService.findOneByEmail(loginDTO.email);
    // Compare the password with the hashed password
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.data.password,
    );
    if (!passwordMatched) {
      throw new UnauthorizedException(
        ResponseMessages.USER.INVALID_CREDENTIALS,
      );
    }
    // Create a JWT token
    const payload: PayloadType = {
      email: user.data.email,
      userId: user.data.id,
    };
    try {
      const artist = await this.artistsService.findOneByUserId(user.data.id);
      payload.artistId = artist.data.id;
    } catch (error) {
      if (
        !(
          error instanceof HttpException &&
          error.getStatus() === HttpStatus.NOT_FOUND.valueOf()
        )
      ) {
        throw error;
      }
      console.log('this use is not an artist');
    }
    const access_token = this.jwtService.sign(payload);
    // Return the response
    return { message: ResponseMessages.AUTH.LOGIN_SUCCESS, access_token };
  }

  /**
   * @function signup
   * @description Signup a new user
   * @param singupData
   * @returns Promise<{ message: string; data: Omit<User, 'password'> }>
   */
  async signup(
    singupData: CreateUserDTO,
  ): Promise<{ message: string; data: Omit<User, 'password'> }> {
    const user = await this.usersService.create(singupData);
    return { message: ResponseMessages.USER.CREATED, data: user.data };
  }
}
