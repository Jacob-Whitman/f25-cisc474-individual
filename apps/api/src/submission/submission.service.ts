import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Submission } from '@repo/database';

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Submission[]> {
    return this.prisma.submission.findMany({
      include: {
        assignment: true,
        student: true,
      },
    });
  }

  async getById(id: string): Promise<Submission | null> {
    return this.prisma.submission.findUnique({
      where: { id },
      include: {
        assignment: true,
        student: true,
      },
    });
  }

  async getByUserId(userId: string): Promise<Submission[]> {
    return this.prisma.submission.findMany({
      where: { studentId: userId },
      include: {
        assignment: true,
        student: true,
      },
    });
  }
}

