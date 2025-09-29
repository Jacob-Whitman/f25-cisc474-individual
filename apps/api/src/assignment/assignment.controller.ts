import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from '@repo/database';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  async getAll(): Promise<Assignment[]> {
    return this.assignmentService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Assignment | null> {
    return this.assignmentService.getById(id);
  }
}

