import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/ENTITY/Course.entity';
import { CreateCourseRequest } from 'src/Request/CourseRequest/CreateCourseRequest.request';
import { UpdateCourseRequest } from 'src/Request/CourseRequest/UpdateCourseRequest.request';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async insertCourse(request: CreateCourseRequest) {
    try {
      const newCourse = this.courseRepository.create({
        Name: request.Name,
        Duration: request.Duration,
        Description: request.Description,
        TeacherName: request.TeacherName,
        Category: request.Category,
        Price: request.Price,
        Level: request.Level,
        EnrollmentCount: request.EnrollmentCount,
        ImageUrl: request.ImageUrl,
        Link: request.Link,
      });

      await this.courseRepository.save(newCourse);

      return { msg: 'Curso insertado exitosamente', success: true };
    } catch (error) {
      console.error('Error al insertar curso:', error);
      return { msg: 'Error al insertar curso', detailMsg: error, success: false };
    }
  }

  async updateCourse(updateCourseDto: UpdateCourseRequest) {
    try {
      const course = await this.courseRepository.findOne({
        where: { IdCourse: updateCourseDto.IdCourse },
      });
      if (!course) {
        return { msg: 'Curso no encontrado', success: false };
      }

      course.Name = updateCourseDto.Name;
      course.Duration = updateCourseDto.Duration;
      course.Description = updateCourseDto.Description;
      course.TeacherName = updateCourseDto.TeacherName;
      course.Category = updateCourseDto.Category;
      course.Price = updateCourseDto.Price;
      course.Level = updateCourseDto.Level;
      course.EnrollmentCount = updateCourseDto.EnrollmentCount;
      course.ImageUrl = updateCourseDto.ImageUrl;
      course.UpdatedAt = new Date();
      course.Link = updateCourseDto.Link;

      await this.courseRepository.save(course);

      return { msg: 'Curso actualizado exitosamente', success: true };
    } catch (error) {
      console.error('Error al actualizar curso:', error);
      return { msg: 'Error al actualizar curso', detailMsg: error, success: false };
    }
  }

  async getAllCourses() {
    try {
      const courses = await this.courseRepository.find();
      return { data: courses, msg: 'Éxito', success: true };
    } catch (error) {
      console.error('Error al obtener cursos:', error);
      return { msg: 'Error al obtener cursos', detailMsg: error, success: false };
    }
  }

  async deleteCourse(courseId: number) {
    try {
      await this.courseRepository.delete(courseId);
      return { msg: 'Curso eliminado exitosamente', success: true };
    } catch (error) {
      console.error('Error al eliminar curso:', error);
      return { msg: 'Error al eliminar curso', detailMsg: error, success: false };
    }
  }

  async getCourseById(courseId: number) {
    try {
      const course = await this.courseRepository.findOne({
        where: { IdCourse: courseId },
      });
      return { data: course, msg: 'Éxito', success: true };
    } catch (error) {
      console.error('Error al obtener curso por ID:', error);
      return { msg: 'Error al obtener curso', detailMsg: error, success: false };
    }
  }
}

