import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Teacher } from './entities/teacher.entity';
import { Student } from './entities/student.entity';
import { Parent } from './entities/parent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Teacher, Student, Parent])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
