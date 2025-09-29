import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from '@repo/database';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAll(): Promise<Course[]> {
    return this.courseService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Course | null> {
    return this.courseService.getById(id);
  }
}

