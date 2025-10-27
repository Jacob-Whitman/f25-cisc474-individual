import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AssignmentService } from './assignment.service';
import { Assignment } from '@repo/database';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/jwt.strategy';

@Controller('assignments')
@UseGuards(AuthGuard('jwt'))
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  async getAll(@CurrentUser() user: JwtUser): Promise<Assignment[]> {
    return this.assignmentService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string, @CurrentUser() user: JwtUser): Promise<Assignment | null> {
    return this.assignmentService.getById(id);
  }
}

