// teacher.entity.ts hoặc tách ra file riêng (teacher-role.enum.ts)
import { registerEnumType } from '@nestjs/graphql';

export enum TeacherRole {
  HOMEROOM = 'HOMEROOM', // giáo viên chủ nhiệm
  HEAD_OF_SUBJECT = 'HEAD_OF_SUBJECT', // trưởng bộ môn
  PRINCIPAL = 'PRINCIPAL', // hiệu trưởng
  VICE_PRINCIPAL = 'VICE_PRINCIPAL', // phó hiệu trưởng
  TEACHER = 'TEACHER', // giáo viên
}

// 👇 PHẢI có đoạn này để GraphQL hiểu enum
registerEnumType(TeacherRole, {
  name: 'TeacherRole',
  description: 'Các vai trò của giáo viên',
});
