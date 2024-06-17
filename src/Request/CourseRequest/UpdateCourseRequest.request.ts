import { IsInt, IsString, IsOptional, IsNumber } from "class-validator";

export class UpdateCourseRequest{
    @IsInt()
    IdCourse: number;
  
    @IsString()
    @IsOptional()
    Name?: string;
  
    @IsInt()
    @IsOptional()
    Duration?: number;
  
    @IsString()
    @IsOptional()
    Description?: string;
  
    @IsString()
    @IsOptional()
    TeacherName?: string;
  
    @IsString()
    @IsOptional()
    Category?: string;
  
    @IsNumber()
    @IsOptional()
    Price?: number;
  
    @IsString()
    @IsOptional()
    Level?: string;
  
    @IsInt()
    @IsOptional()
    EnrollmentCount?: number;
  
    @IsString()
    @IsOptional()
    ImageUrl?: string;
}