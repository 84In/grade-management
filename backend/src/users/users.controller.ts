import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateParentDto } from './dto/create-parent.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { success } from '../common/helpers/response.helper';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // === STUDENT ===
  @Post('student')
  async createStudent(@Body() dto: CreateStudentDto) {
    const student = await this.usersService.createStudent(dto);
    return success('Student created successfully', student, 201);
  }

  @Get('student/:id')
  async findStudent(@Param('id') id: number) {
    const student = await this.usersService.findStudentById(id);
    return success('Student fetched successfully', student);
  }

  @Put('student/:id')
  async updateStudent(@Param('id') id: number, @Body() dto: UpdateStudentDto) {
    const student = await this.usersService.updateStudent(id, dto);
    return success('Student updated successfully', student);
  }

  @Delete('student/:id')
  async deleteStudent(@Param('id') id: number) {
    await this.usersService.removeStudent(id);
    return success('Student deleted successfully');
  }

  // === PARENT ===
  @Post('parent')
  async createParent(@Body() dto: CreateParentDto) {
    const parent = await this.usersService.createParent(dto);
    return success('Parent created successfully', parent, 201);
  }

  @Get('parent/:id')
  async findParent(@Param('id') id: number) {
    const parent = await this.usersService.findParentById(id);
    return success('Parent fetched successfully', parent);
  }

  @Put('parent/:id')
  async updateParent(@Param('id') id: number, @Body() dto: UpdateParentDto) {
    const parent = await this.usersService.updateParent(id, dto);
    return success('Parent updated successfully', parent);
  }

  @Delete('parent/:id')
  async deleteParent(@Param('id') id: number) {
    await this.usersService.removeParent(id);
    return success('Parent deleted successfully');
  }

  // === TEACHER ===
  @Post('teacher')
  async createTeacher(@Body() dto: CreateTeacherDto) {
    const teacher = await this.usersService.createTeacher(dto);
    return success('Teacher created successfully', teacher, 201);
  }

  @Get('teacher/:id')
  async findTeacher(@Param('id') id: number) {
    const teacher = await this.usersService.findTeacherById(id);
    return success('Teacher fetched successfully', teacher);
  }

  @Put('teacher/:id')
  async updateTeacher(@Param('id') id: number, @Body() dto: UpdateTeacherDto) {
    const teacher = await this.usersService.updateTeacher(id, dto);
    return success('Teacher updated successfully', teacher);
  }

  @Delete('teacher/:id')
  async deleteTeacher(@Param('id') id: number) {
    await this.usersService.removeTeacher(id);
    return success('Teacher deleted successfully');
  }
}
