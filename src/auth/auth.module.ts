import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from 'src/common/constants/auth.constants';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
