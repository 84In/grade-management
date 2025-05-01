import { ChildEntity, Column } from 'typeorm';
import { User } from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { TeacherRole } from '../enums/teacher-role.enum';

@ChildEntity()
@ObjectType()
export class Teacher extends User {
  @Field(() => String)
  @Column()
  expertise: string; // chuyên môn

  @Field(() => [TeacherRole])
  @Column({ type: 'simple-array' })
  roles: TeacherRole[];
}
