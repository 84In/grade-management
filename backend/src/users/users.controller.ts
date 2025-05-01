import { Body, Controller, Post } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UsersService } from './users.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('student')
  createStudent(@Body() dto: CreateStudentDto) {
    return this.usersService.createStudent(dto);
  }

  @Post('parent')
  createParent(@Body() dto: CreateParentDto) {
    return this.usersService.createParent(dto);
  }

  @Post('teacher')
  createTeacher(@Body() dto: CreateTeacherDto) {
    return this.usersService.createTeacher(dto);
  }
}
