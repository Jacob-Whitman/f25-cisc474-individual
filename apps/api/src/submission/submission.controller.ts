import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubmissionService } from './submission.service';
import { Submission } from '@repo/database';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/jwt.strategy';

@Controller('submissions')
@UseGuards(AuthGuard('jwt'))
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Get()
  async getAll(@CurrentUser() user: JwtUser): Promise<Submission[]> {
    return this.submissionService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string, @CurrentUser() user: JwtUser): Promise<Submission | null> {
    return this.submissionService.getById(id);
  }

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: string, @CurrentUser() user: JwtUser): Promise<Submission[]> {
    return this.submissionService.getByUserId(userId);
  }
}

