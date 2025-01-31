import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PayloadType } from 'src/common/interfaces/payload.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: { user: PayloadType }) {
    return this.usersService.getProfile(req.user);
  }
}
