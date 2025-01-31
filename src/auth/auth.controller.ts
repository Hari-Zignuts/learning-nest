import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  singup(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<{ message: string; data: Omit<User, 'password'> }> {
    return this.authService.signup(createUserDTO);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
    return this.authService.login(loginDTO);
  }
}
