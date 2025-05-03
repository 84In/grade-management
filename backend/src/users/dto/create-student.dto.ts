import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsArray()
  parentIds: number[];
}
