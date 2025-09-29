import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Profile } from '@repo/database';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany({
      include: {
        user: true,
      },
    });
  }

  async getById(id: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }
}

