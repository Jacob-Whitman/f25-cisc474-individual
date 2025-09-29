import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from '@repo/database';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getAll(): Promise<Profile[]> {
    return this.profileService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Profile | null> {
    return this.profileService.getById(id);
  }
}

