import { Test, TestingModule } from '@nestjs/testing';
import { AnnoncementsService } from './annoncements.service';

describe('AnnoncementsService', () => {
  let service: AnnoncementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnoncementsService],
    }).compile();

    service = module.get<AnnoncementsService>(AnnoncementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
