import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByGoogleOrFacebookId(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: [{ googleId: id }, { facebookId: id }],
    });
  }
  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }
  async createUser(
    id: string,
    username: string,
    email: string,
    profilePic: string,
    type: string,
  ): Promise<User> {
    // Create a user object with common fields
    const userData = {
      username,
      email,
      profilePic,
    };

    // Conditionally set googleId or facebookId based on the type
    if (type === 'google') {
      userData['googleId'] = id; // Set googleId if the type is 'google'
    } else if (type === 'facebook') {
      userData['facebookId'] = id; // Set facebookId if the type is 'facebook'
    }

    // Create a new user instance
    const user = this.userRepository.create(userData);

    // Save the user to the database
    return this.userRepository.save(user);
  }
}
