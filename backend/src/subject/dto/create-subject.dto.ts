import { IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  description: string;
}
