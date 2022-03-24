import { Test, TestingModule } from '@nestjs/testing';
import { CourierNotFoundService } from './courier-not-found.service';

describe('CourierNotFoundService', () => {
  let service: CourierNotFoundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourierNotFoundService],
    }).compile();

    service = module.get<CourierNotFoundService>(CourierNotFoundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
