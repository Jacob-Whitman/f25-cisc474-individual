import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CourseService } from './course.service';
import { Course } from '@repo/database';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/jwt.strategy';
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
@UseGuards(AuthGuard('jwt'))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAll(@CurrentUser() user: JwtUser): Promise<Course[]> {
    try {
      console.log('CourseController.getAll() called by user:', user.userId);
      const courses = await this.courseService.getAll();
      console.log('CourseController.getAll() returning:', courses.length, 'courses');
      return courses;
    } catch (error) {
      console.error('Error in CourseController.getAll():', error);
      throw error;
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Course | null> {
    return this.courseService.getById(id);
  }

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto, @CurrentUser() user: JwtUser): Promise<Course> {
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

