import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PayloadType } from 'src/common/interfaces/payload.interface';
import { Enable2FAType } from 'src/common/types/auth-types';
import { ValidateTokenDTO } from './dto/validate-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  singup(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<{ message: string; data: Omit<User, 'password'> }> {
    return this.authService.signup(createUserDTO);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enable 2FA' })
  @ApiResponse({ status: 200, description: '2FA enabled successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  enable2FA(@Request() req: { user: PayloadType }): Promise<Enable2FAType> {
    const secret = this.authService.enable2FA(req.user.userId);
    return secret;
  }

  @Post('disable-2fa')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Disable 2FA' })
  @ApiResponse({ status: 200, description: '2FA disabled successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  disable2FA(
    @Request() req: { user: PayloadType },
  ): Promise<{ message: string }> {
    return this.authService.disable2FA(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validate 2FA token' })
  @ApiBody({ type: ValidateTokenDTO })
  @ApiResponse({
    status: 200,
    description: '2FA token validated successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
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
