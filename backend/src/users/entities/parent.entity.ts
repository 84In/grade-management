import { ChildEntity, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Student } from './student.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@ChildEntity()
export class Parent extends User {
  @Field(() => [Student])
  @ManyToMany(() => Student, (student) => student.parents)
  children: Student[];
}
