import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post } from '@repo/database';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        author: true,
        category: true,
        comments: true,
      },
    });
  }

  async getById(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        category: true,
        comments: true,
      },
    });
  }
}

