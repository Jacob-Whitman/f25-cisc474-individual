import { Controller, Get, Param } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from '@repo/database';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  async getAll(): Promise<Enrollment[]> {
    return this.enrollmentService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Enrollment | null> {
    return this.enrollmentService.getById(id);
  }

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: string): Promise<Enrollment[]> {
    return this.enrollmentService.getByUserId(userId);
  }
}

