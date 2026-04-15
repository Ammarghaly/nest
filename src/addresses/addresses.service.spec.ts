import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { ForbiddenException } from '@nestjs/common';

describe('AddressesService', () => {
  let service: AddressesService;

  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
  });

  it('should throw ForbiddenException if user tries to update another users address', async () => {
    mockRepo.findOne.mockResolvedValue({ id: 1, user: { id: 999 } });

    await expect(service.update(1, 1, { city: 'Cairo' }))
      .rejects.toThrow(ForbiddenException);
  });

  it('should reset other default addresses when creating a new default one', async () => {
    mockRepo.create.mockReturnValue({ isDefault: true, user: { id: 1 } });
    mockRepo.save.mockResolvedValue({ id: 2, isDefault: true });

    await service.create(1, {
      city: 'Cairo', street: 'St', building: '1',
      postalCode: '123', country: 'Egypt',
      isDefault: true,
    });

    expect(mockRepo.update).toHaveBeenCalledWith(
      { user: { id: 1 } },
      { isDefault: false },
    );
  });
});
