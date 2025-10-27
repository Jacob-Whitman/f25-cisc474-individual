import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from '@repo/database';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/jwt.strategy';

@Controller('enrollments')
@UseGuards(AuthGuard('jwt'))
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  async getAll(@CurrentUser() user: JwtUser): Promise<Enrollment[]> {
    return this.enrollmentService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string, @CurrentUser() user: JwtUser): Promise<Enrollment | null> {
    return this.enrollmentService.getById(id);
  }

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: string, @CurrentUser() user: JwtUser): Promise<Enrollment[]> {
    return this.enrollmentService.getByUserId(userId);
  }
}

