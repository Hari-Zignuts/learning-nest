import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConstants } from 'src/common/constants/auth.constants';
import { PayloadType } from 'src/common/interfaces/payload.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.secret,
    });
  }

  validate(payload: PayloadType) {
    return {
      userId: payload.userId,
      artistId: payload.artistId,
      email: payload.email,
    };
  }
}
