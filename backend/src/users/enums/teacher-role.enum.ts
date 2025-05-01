// teacher.entity.ts hoặc tách ra file riêng (teacher-role.enum.ts)
import { registerEnumType } from '@nestjs/graphql';

export enum TeacherRole {
  HOMEROOM = 'HOMEROOM',
  HEAD_OF_SUBJECT = 'HEAD_OF_SUBJECT',
  PRINCIPAL = 'PRINCIPAL',
  VICE_PRINCIPAL = 'VICE_PRINCIPAL',
}

// 👇 PHẢI có đoạn này để GraphQL hiểu enum
registerEnumType(TeacherRole, {
  name: 'TeacherRole',
  description: 'Các vai trò của giáo viên',
});
