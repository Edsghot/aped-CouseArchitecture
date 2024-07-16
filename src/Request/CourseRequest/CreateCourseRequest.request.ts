import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateCourseRequest{
    @IsString()
    Name: string;
  
    @IsInt()
    Duration: number;
  
    @IsString()
    Description: string;
  
    @IsString()
    TeacherName: string;
  
    @IsString()
    Category: string;
  
    @IsNumber()
    Price: number;
  
    @IsString()
    Level: string;
  
    @IsInt()
    EnrollmentCount: number;
  
    @IsString()
    ImageUrl: string;

    @IsString()
    Link: string;
}