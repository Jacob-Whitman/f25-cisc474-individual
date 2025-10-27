import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { Post } from '@repo/database';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/jwt.strategy';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll(@CurrentUser() user: JwtUser): Promise<Post[]> {
    return this.postService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string, @CurrentUser() user: JwtUser): Promise<Post | null> {
    return this.postService.getById(id);
  }

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: string, @CurrentUser() user: JwtUser): Promise<Post[]> {
    return this.postService.getByUserId(userId);
  }
}
