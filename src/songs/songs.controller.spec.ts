import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SongRepository } from './repositories/song.repository';
import { ArtistRepository } from './repositories/artist.repository';

describe('SongsController', () => {
  let controller: SongsController;
  let service: SongsService;
  let songRepository: SongRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
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

    controller = module.get<SongsController>(SongsController);
    service = module.get<SongsService>(SongsService);
    songRepository = module.get<SongRepository>(SongRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(songRepository).toBeDefined();
  });
});
