import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
export interface RequestWithUser extends Request {
  user: User;
}
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }
  @Post()
  async createPost(
    @Body() createPostDto: { title: string; body: string; userId: string },
  ): Promise<PostEntity | null> {
    const { title, body, userId } = createPostDto;
    return this.postService.createPost(title, body, userId);
  }
  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostEntity | null> {
    return this.postService.getPostById(id);
  }
}
