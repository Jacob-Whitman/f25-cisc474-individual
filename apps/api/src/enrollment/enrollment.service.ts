import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Enrollment } from '@repo/database';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      include: {
        user: true,
        course: true,
      },
    });
  }

  async getById(id: string): Promise<Enrollment | null> {
    return this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    });
  }

  async getByUserId(userId: string): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        user: true,
        course: true,
      },
    });
  }
}

