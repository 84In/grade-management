import { IsOptional, IsString } from 'class-validator';

export class CreateParentDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
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
}
