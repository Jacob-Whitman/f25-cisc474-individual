import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Assignment } from '@repo/database';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({
      include: {
        course: true,
        submissions: true,
      },
    });
  }

  async getById(id: string): Promise<Assignment | null> {
    return this.prisma.assignment.findUnique({
      where: { id },
      include: {
        course: true,
        submissions: true,
      },
    });
  }
}

