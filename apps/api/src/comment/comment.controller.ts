import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '@repo/database';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAll(): Promise<Comment[]> {
    return this.commentService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Comment | null> {
    return this.commentService.getById(id);
  }
}
