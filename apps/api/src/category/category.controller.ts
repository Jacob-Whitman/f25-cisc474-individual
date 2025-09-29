import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@repo/database';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Category | null> {
    return this.categoryService.getById(id);
  }
}

