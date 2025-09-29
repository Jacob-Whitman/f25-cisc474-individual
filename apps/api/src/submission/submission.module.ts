import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SubmissionController],
  providers: [SubmissionService, PrismaService],
})
export class SubmissionModule {}

