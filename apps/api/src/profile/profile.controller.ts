import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { Profile } from '@repo/database';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/jwt.strategy';

@Controller('profiles')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getAll(@CurrentUser() user: JwtUser): Promise<Profile[]> {
    return this.profileService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string, @CurrentUser() user: JwtUser): Promise<Profile | null> {
    return this.profileService.getById(id);
  }
}

