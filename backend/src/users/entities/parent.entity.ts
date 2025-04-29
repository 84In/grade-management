import { ChildEntity, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Student } from './student.entity';

@ChildEntity()
export class Parent extends User {
  @ManyToMany(() => Student, (student) => student.parents)
  children: Student[];
}
