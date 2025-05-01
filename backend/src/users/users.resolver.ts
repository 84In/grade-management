import { Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Student } from './entities/student.entity';
import { Parent } from './entities/parent.entity';
import { Teacher } from './entities/teacher.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [Student])
  async students(): Promise<Student[]> {
    return this.usersService.findAllStudents();
  }

  @Query(() => [Parent])
  async parents(): Promise<Parent[]> {
    return this.usersService.findAllParents();
  }

  @Query(() => [Teacher])
  async teachers(): Promise<Teacher[]> {
    return this.usersService.findAllTeachers();
  }
}
