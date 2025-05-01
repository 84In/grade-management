import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: 'UsersService',
          useValue: {
            findAll: jest.fn().mockResolvedValue([]), // Mock implementation for findAll
            findOne: jest.fn().mockResolvedValue(null), // Mock implementation for findOne
            create: jest.fn().mockResolvedValue({}), // Mock implementation for create
            update: jest.fn().mockResolvedValue({}), // Mock implementation for update
            remove: jest.fn().mockResolvedValue({}), // Mock implementation for remove
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
