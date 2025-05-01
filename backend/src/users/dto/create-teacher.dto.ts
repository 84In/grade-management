import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { TeacherRole } from '../enums/teacher-role.enum';

export class CreateTeacherDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsString()
  expertise: string;

  @IsArray()
  @IsEnum(TeacherRole, { each: true })
  roles: TeacherRole[];
}
