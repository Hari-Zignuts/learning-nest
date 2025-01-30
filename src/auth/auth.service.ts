import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/repositories/user.repository';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(loginDTO: LoginDTO): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findUserByEmail(loginDTO.email);
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
