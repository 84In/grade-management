import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PasswordHelper } from 'src/common/helpers/password.helper';

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
    const exists = await this.studentRepo.findOne({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException('Email already in use');
    const student = this.studentRepo.create();
    Object.assign(student, dto, {
      parents,
      type: 'Student',
      password: PasswordHelper.hashPassword(dto.password),
    });
    return await this.studentRepo.save(student);
  }

  async createParent(dto: CreateParentDto): Promise<Parent> {
    const parent = this.parentRepo.create();
    const exists = await this.parentRepo.findOne({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException('Email already in use');
    Object.assign(parent, dto, {
      type: 'Parent',
      password: PasswordHelper.hashPassword(dto.password),
    });
    return await this.parentRepo.save(parent);
  }
  async createTeacher(dto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepo.create();
    const exists = await this.teacherRepo.findOne({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException('Email already in use');
    Object.assign(teacher, dto, {
      type: 'Teacher',
      password: PasswordHelper.hashPassword(dto.password),
    });
    // Check if the teacher already exists
    const existingTeacher = await this.teacherRepo.findOne({
      where: { email: dto.email },
    });
    if (existingTeacher) {
      throw new ConflictException('Teacher with this email already exists');
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

  //get user by id
  async findStudentById(id: number): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['parents'],
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }
  async findParentById(id: number): Promise<Parent> {
    const parent = await this.parentRepo.findOne({
      where: { id },
    });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }
    return parent;
  }
  async findTeacherById(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepo.findOne({
      where: { id },
    });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return teacher;
  }
  //delete user by id
  async removeStudent(id: number): Promise<void> {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    await this.studentRepo.remove(student);
  }
  async removeParent(id: number): Promise<void> {
    const parent = await this.parentRepo.findOne({ where: { id } });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }
    await this.parentRepo.remove(parent);
  }
  async removeTeacher(id: number): Promise<void> {
    const teacher = await this.teacherRepo.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    await this.teacherRepo.remove(teacher);
  }
  //update user by id
  async updateStudent(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['parents'], // để giữ quan hệ nếu không cập nhật
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const password = dto.password
      ? await PasswordHelper.hashPassword(dto.password)
      : student.password;

    const parents = dto.parentIds?.length
      ? await this.parentRepo.find({ where: { id: In(dto.parentIds) } })
      : student.parents;

    Object.assign(student, dto, { parents, password });

    return await this.studentRepo.save(student);
  }
  async updateParent(id: number, dto: UpdateParentDto): Promise<Parent> {
    const parent = await this.parentRepo.findOne({ where: { id } });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    const password = dto.password
      ? await PasswordHelper.hashPassword(dto.password)
      : parent.password;
    Object.assign(parent, dto, { password });
    return await this.parentRepo.save(parent);
  }
  async updateTeacher(id: number, dto: UpdateTeacherDto): Promise<Teacher> {
    console.log(id);
    const teacher = await this.teacherRepo
      .createQueryBuilder('teacher')
      .addSelect('teacher.password')
      .where('teacher.id = :id', { id })
      .getOne();
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    const password = dto.password
      ? await PasswordHelper.hashPassword(dto.password)
      : teacher.password;
    Object.assign(teacher, dto, { password });
    return await this.teacherRepo.save(teacher);
  }
  //user login
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email=:email', { email })
      .getOne();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findUserById(id: number): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id=:id', { id })
      .getOne();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findUserByUsername(username: string): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findUserByPhone(phone: string): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.phone=:phone', { phone })
      .getOne();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
