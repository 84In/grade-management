import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { TeacherRole } from '../enums/teacher-role.enum';

export class UpdateTeacherDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsString()
  @IsOptional()
  expertise: string;

  @IsArray()
  @IsOptional()
  @IsEnum(TeacherRole, { each: true })
  roles: TeacherRole[];
}
//
