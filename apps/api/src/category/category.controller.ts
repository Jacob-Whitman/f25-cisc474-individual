import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { Category } from '@repo/database';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/jwt.strategy';

@Controller('categories')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(@CurrentUser() user: JwtUser): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string, @CurrentUser() user: JwtUser): Promise<Category | null> {
    return this.categoryService.getById(id);
  }
}

