import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from '@repo/database';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll(): Promise<Post[]> {
    return this.postService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Post | null> {
    return this.postService.getById(id);
  }
}
