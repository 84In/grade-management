import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { success } from '../common/helpers/response.helper';

describe('UsersController', () => {
  let controller: UsersController;
  // Removed unused usersService variable

  // Dữ liệu học sinh mẫu để mock trả về
  const mockStudent = {
    id: 1,
    firstname: 'An',
    lastname: 'Nguyen',
    username: 'student1',
    email: 'student@example.com',
    phone: '0909999999',
    type: 'Student',
    address: 'HCM',
    parents: [],
  };

  // Mock service để thay thế UsersService thật
  const mockUsersService = {
    createStudent: jest.fn().mockResolvedValue(mockStudent),
    findStudentById: jest.fn().mockResolvedValue(mockStudent),
    updateStudent: jest.fn().mockResolvedValue({
      ...mockStudent,
      firstname: 'Bảo', // test cập nhật tên
    }),
    removeStudent: jest.fn().mockResolvedValue(undefined), // xóa thì không trả gì
  };

  // Trước mỗi test, khởi tạo module test với controller và service giả
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService, // inject bản mock vào
        },
      ],
    }).compile();

    controller = module.get(UsersController);
    // usersService = module.get(UsersService);
  });

  // Test đơn giản: controller có tồn tại không
  it('should be defined', () => {
    expect(typeof controller.createStudent).toBe('function'); // dùng typeof để tránh lỗi ESLint
    expect(typeof controller.findStudent).toBe('function');
    expect(typeof controller.updateStudent).toBe('function');
    expect(typeof controller.deleteStudent).toBe('function');
  });

  // === TEST CREATE ===
  describe('createStudent', () => {
    it('should return created student', async () => {
      const dto: CreateStudentDto = {
        firstname: 'An',
        lastname: 'Nguyen',
        username: 'student1',
        email: 'student@example.com',
        phone: '0909999999',
        address: 'HCM',
        parentIds: [],
      };

      const result = await controller.createStudent(dto);
      expect(result).toEqual(
        success('Student created successfully', mockStudent, 201),
      );
      expect(mockUsersService.createStudent).toHaveBeenCalledWith(dto);
    });
  });

  // === TEST GET BY ID ===
  describe('findStudent', () => {
    it('should return student by id', async () => {
      const result = await controller.findStudent(1);
      expect(result).toEqual(
        success('Student fetched successfully', mockStudent),
      );
      expect(mockUsersService.findStudentById).toHaveBeenCalledWith(1);
    });
  });

  // === TEST UPDATE ===
  describe('updateStudent', () => {
    it('should update and return student', async () => {
      const dto: UpdateStudentDto = {
        firstname: 'Bảo', // chỉ update tên
        lastname: 'Nguyen',
        email: 'student@example.com',
        phone: '0909999999',
        parentIds: [],
      };

      const result = await controller.updateStudent(1, dto);
      expect(result).toEqual(
        success('Student updated successfully', {
          ...mockStudent,
          firstname: 'Bảo',
        }),
      );
      expect(mockUsersService.updateStudent).toHaveBeenCalledWith(1, dto);
    });
  });

  // === TEST DELETE ===
  describe('deleteStudent', () => {
    it('should delete student and return message', async () => {
      const result = await controller.deleteStudent(1);
      expect(result).toEqual(success('Student deleted successfully'));
      expect(mockUsersService.removeStudent).toHaveBeenCalledWith(1);
    });
  });
});
