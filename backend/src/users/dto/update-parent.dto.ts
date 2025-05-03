import { IsEmail, IsOptional, IsString } from 'class-validator';
export class UpdateParentDto {
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
}
