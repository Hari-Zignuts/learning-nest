import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from './songs.service';
import { SongRepository } from './repositories/song.repository';
import { ArtistRepository } from './repositories/artist.repository';

describe('SongsService', () => {
  let service: SongsService;
  let repository: SongRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongsService,
        {
          provide: SongRepository,
          useValue: {},
        },
        {
          provide: ArtistRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SongsService>(SongsService);
    repository = module.get<SongRepository>(SongRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
