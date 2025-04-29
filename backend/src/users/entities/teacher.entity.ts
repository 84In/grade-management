import { ChildEntity, Column } from 'typeorm';
import { User } from './user.entity';

export enum TeacherRole {
  HOMEROOM = 'Chủ nhiệm',
  HEAD_OF_SUBJECT = 'Trưởng bộ môn',
  PRINCIPAL = 'Hiệu trưởng',
  VICE_PRINCIPAL = 'Hiệu phó',
}

@ChildEntity()
export class Teacher extends User {
  @Column()
  expertise: string; // chuyên môn

  @Column({
    type: 'simple-array', // Lưu nhiều vai trò
  })
  roles: TeacherRole[]; // Definite assignment assertion
}
