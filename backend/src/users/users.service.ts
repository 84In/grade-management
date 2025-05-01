import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Parent } from './entities/parent.entity';
import { Teacher } from './entities/teacher.entity';
import { CreateParentDto } from './dto/create-parent.dto';
import { In } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Parent)
    private readonly parentRepo: Repository<Parent>,

    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,

    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async createStudent(dto: CreateStudentDto): Promise<Student> {
    const parents = await this.parentRepo.find({
      where: {
        id: In(dto.parentIds),
      },
    });
    const student = this.studentRepo.create();
    Object.assign(student, dto, {
      parents,
      type: 'Student',
    });
    return await this.studentRepo.save(student);
  }

  async createParent(dto: CreateParentDto): Promise<Parent> {
    const parent = this.parentRepo.create();
    Object.assign(parent, dto, {
      type: 'Parent',
    });
    return await this.parentRepo.save(parent);
  }
  async createTeacher(dto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepo.create();
    Object.assign(teacher, dto, {
      type: 'Teacher',
    });
    // Check if the teacher already exists
    const existingTeacher = await this.teacherRepo.findOne({
      where: { email: dto.email },
    });
    if (existingTeacher) {
      throw new Error('Teacher with this email already exists');
    }
    return await this.teacherRepo.save(teacher);
  }

  //get all users
  async findAllStudents(): Promise<Student[]> {
    return this.studentRepo.find({ relations: ['parents'] });
  }

  async findAllParents(): Promise<Parent[]> {
    return this.parentRepo.find();
  }

  async findAllTeachers(): Promise<Teacher[]> {
    return this.teacherRepo.find();
  }
}
