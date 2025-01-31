import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ArtistsService } from 'src/artists/artists.service';
import { ResponseMessages } from 'src/common/constants/response-messages';
import { PayloadType } from 'src/common/interfaces/payload.interface';

@Injectable()
export class JwtArtistGuard extends AuthGuard('jwt') {
  constructor(private readonly artistsService: ArtistsService) {
    super();
  }

  /**
   * Override canActivate method to handle custom conditions.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context); // Calls default JWT authentication
  }

  /**
   * Handle the request by checking if the user has an artistId.
   *
   * @param err - Error object if any
   * @param user - The user object retrieved from JWT
   * @returns {Promise<any>} - The user object with artistId if valid
   */

  handleRequest<TUser = PayloadType>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw new UnauthorizedException(
        'Unauthorized access: Missing or invalid JWT token',
      );
    }

    if (typeof user !== 'object' || !('artistId' in user)) {
      throw new UnauthorizedException(
        'Unauthorized access: User is not an artist',
      );
    }

    if (!user.artistId) {
      throw new UnauthorizedException(ResponseMessages.GENERAL.FORBIDDEN);
    }

    if (typeof user.artistId !== 'number' || isNaN(user.artistId)) {
      throw new UnauthorizedException(ResponseMessages.GENERAL.FORBIDDEN);
    }

    // fix that 
    try {
      // Check if artistId is valid
      console.log('no1');
      const getArtist = async (id: number) => {
        await this.artistsService.findOneById(id);
      };
      console.log('no2');
      getArtist(user.artistId).catch(() => {
        throw new UnauthorizedException(ResponseMessages.GENERAL.FORBIDDEN);
      });
      console.log('no3');

      // Return user if artistId is valid
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log('no4');

      // Handle specific exception based on the error type (if necessary)
      throw new UnauthorizedException(
        'Unauthorized access: Artist not found or verification failed',
      );
    }
  }
}
