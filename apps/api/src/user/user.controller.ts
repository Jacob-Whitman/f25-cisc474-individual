import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@repo/database';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getById(id);
  }
}


