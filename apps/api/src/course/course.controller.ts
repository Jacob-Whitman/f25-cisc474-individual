import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from '@repo/database';
// Temporary relative import until module resolution is fixed
interface CreateCourseDto {
  code: string;
  title: string;
  description?: string;
  ownerId?: string;
}

interface UpdateCourseDto {
  code?: string;
  title?: string;
  description?: string;
  isArchived?: boolean;
  ownerId?: string;
}

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

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.create(createCourseDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<Course | null> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Course | null> {
    return this.courseService.delete(id);
  }
}

