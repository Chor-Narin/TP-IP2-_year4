import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  userId: number;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
