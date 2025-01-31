import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistRepository } from './repositories/artist.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), UsersModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistRepository],
  exports: [ArtistsService],
})
export class ArtistsModule {}
