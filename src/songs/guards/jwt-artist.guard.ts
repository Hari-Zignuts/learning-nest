import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ArtistsService } from 'src/artists/artists.service';
import { CustomRequest } from 'src/common/interfaces/request-with-user.interface';

@Injectable()
export class RoleBaseGuard implements CanActivate {
  constructor(private artistsService: ArtistsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    if (!request.user || !request.user.artistId) return false;
    return (await this.artistsService.findOneById(request.user.artistId))
      ? true
      : false;
  }
}
