import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@repo/database';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        profile: true,
        enrollments: true,
        ownedCourses: true,
        posts: true,
        submissions: true,
        Comment: true,
      },
    });
  }

  async getById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        enrollments: true,
        ownedCourses: true,
        posts: true,
        submissions: true,
        Comment: true,
      },
    });
  }
}
