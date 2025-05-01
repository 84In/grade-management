import { ChildEntity, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Parent } from './parent.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@ChildEntity()
export class Student extends User {
  @Field(() => [Parent])
  @ManyToMany(() => Parent, (parent: Parent) => parent.children, {
    cascade: true,
  })
  @JoinTable({
    name: 'student_parents', // Bảng trung gian
    joinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'parent_id',
      referencedColumnName: 'id',
    },
  })
  parents: Parent[];
}
