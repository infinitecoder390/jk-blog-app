import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createPost(
    title: string,
    body: string,
    userId: string,
  ): Promise<Post | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const post = this.postRepository.create({ title, body, user, userId });
    return this.postRepository.save(post);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPostById(id: string): Promise<Post | null> {
    return this.postRepository.findOne({ where: { id }, relations: ['user'] });
  }
}
