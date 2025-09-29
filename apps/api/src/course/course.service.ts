import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Course } from '@repo/database';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Course[]> {
    return this.prisma.course.findMany({
      include: {
        owner: true,
        enrollments: true,
        assignments: true,
      },
    });
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
}

