import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PayloadType } from 'src/common/interfaces/payload.interface';
import { Enable2FAType } from 'src/common/types/auth-types';
import { ValidateTokenDTO } from './dto/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  singup(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<{ message: string; data: Omit<User, 'password'> }> {
    return this.authService.signup(createUserDTO);
  }

  @Post('login')
  login(
    @Body() loginDTO: LoginDTO,
  ): Promise<
    | { message: string; access_token: string }
    | { validate2FA: string; message: string }
  > {
    return this.authService.login(loginDTO);
  }

  @Post('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(@Request() req: { user: PayloadType }): Promise<Enable2FAType> {
    const secret = this.authService.enable2FA(req.user.userId);
    return secret;
  }

  @Post('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(
    @Request() req: { user: PayloadType },
  ): Promise<{ message: string }> {
    return this.authService.disable2FA(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Request() req: { user: PayloadType },
    @Body('token') validateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      validateTokenDTO.token,
    );
  }
}
