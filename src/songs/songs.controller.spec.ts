import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SongRepository } from './repositories/song.repository';

describe('SongsController', () => {
  let controller: SongsController;
  let service: SongsService;
  let songRepository: SongRepository;

  beforeEach(async () => {
    const mockSongRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [
        SongsService,
        {
          provide: SongRepository,
          useValue: mockSongRepository,
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
