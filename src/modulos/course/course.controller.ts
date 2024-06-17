import { Controller, Post, Body, Put, Param, Get, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseRequest } from 'src/Request/CourseRequest/CreateCourseRequest.request';
import { UpdateCourseRequest } from 'src/Request/CourseRequest/UpdateCourseRequest.request';

@Controller('api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/insert')
  async insertCourse(@Body() createCourseDto: CreateCourseRequest) {
    return await this.courseService.insertCourse(createCourseDto);
  }

  @Put('/update')
  async updateCourse(@Body() updateCourseDto: UpdateCourseRequest) {
    return await this.courseService.updateCourse(updateCourseDto);
  }

  @Get('/all')
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  @Delete('/delete/:id')
  async deleteCourse(@Param('id') courseId: number) {
    return await this.courseService.deleteCourse(courseId);
  }

  @Get('/getById/:id')
  async getCourseById(@Param('id') courseId: number) {
    return await this.courseService.getCourseById(courseId);
  }
}
