import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
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

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Course[]> {
    try {
      console.log('CourseService.getAll() called');
      const courses = await this.prisma.course.findMany({
        include: {
          owner: true,
          enrollments: true,
          assignments: true,
        },
      });
      console.log('Courses found:', courses.length);
      return courses;
    } catch (error) {
      console.error('Error in CourseService.getAll():', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        owner: true,
        enrollments: true,
        assignments: true,
      },
    });
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.prisma.course.create({
      data: createCourseDto,
      include: {
        owner: true,
        enrollments: true,
        assignments: true,
      },
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course | null> {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
      include: {
        owner: true,
        enrollments: true,
        assignments: true,
      },
    });
  }

  async delete(id: string): Promise<Course | null> {
    return this.prisma.course.delete({
      where: { id },
      include: {
        owner: true,
        enrollments: true,
        assignments: true,
      },
    });
  }
}

