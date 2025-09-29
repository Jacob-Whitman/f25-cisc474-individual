import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Comment } from '@repo/database';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      include: {
        author: true,
        post: true,
      },
    });
  }

  async getById(id: string): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        author: true,
        post: true,
      },
    });
  }
}
