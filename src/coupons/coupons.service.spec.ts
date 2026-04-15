import { Test, TestingModule } from '@nestjs/testing';
import { CouponsService } from './coupons.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';

describe('CouponsService', () => {
  let service: CouponsService;
  let repo: any;

  const mockRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouponsService,
        {
          provide: getRepositoryToken(Coupon),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<CouponsService>(CouponsService);
    repo = module.get(getRepositoryToken(Coupon));
  });

  it('should create a coupon successfully', async () => {
    repo.create.mockReturnValue({ code: 'NEW10' });
    repo.save.mockResolvedValue({ id: 1, code: 'NEW10' });

    const result = await service.create({ code: 'NEW10', discountPercent: 10, expiresAt: '2026-12-31' });
    expect(result).toBeDefined();
    expect(result.code).toBe('NEW10');
  });

  it('should throw NotFoundException if coupon not found', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow();
  });
});
