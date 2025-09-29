import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category } from '@repo/database';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        posts: true,
      },
    });
  }

  async getById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
  }
}

