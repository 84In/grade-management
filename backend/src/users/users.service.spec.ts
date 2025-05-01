import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useValue: {}, // Mock implementation of UserRepository
        },
        {
          provide: 'ParentRepository',
          useValue: {}, // Mock implementation of ParentRepository
        },
        {
          provide: 'StudentRepository',
          useValue: {}, // Mock implementation of StudentRepository
        },
        {
          provide: 'TeacherRepository',
          useValue: {}, // Mock implementation of TeacherRepository
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
