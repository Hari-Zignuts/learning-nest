import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/repositories/user.repository';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.userRepository.findUserByEmail(loginDTO.email);
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
