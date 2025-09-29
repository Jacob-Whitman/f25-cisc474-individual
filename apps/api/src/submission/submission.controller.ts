import { Controller, Get, Param } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { Submission } from '@repo/database';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Get()
  async getAll(): Promise<Submission[]> {
    return this.submissionService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Submission | null> {
    return this.submissionService.getById(id);
  }
}

