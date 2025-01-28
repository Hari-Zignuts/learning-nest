import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from './songs.service';
import { SongRepository } from './repositories/song.repository';

describe('SongsService', () => {
  let service: SongsService;
  let repository: SongRepository;

  beforeEach(async () => {
    const mockSongRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongsService,
        {
          provide: SongRepository,
          useValue: mockSongRepository,
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
