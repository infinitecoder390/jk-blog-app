import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(
    id: string,
    displayName: string,
    email: string,
    profilePic: string,
    type: string,
  ): Promise<User> {
    let user = await this.userService.findOneByGoogleOrFacebookId(id);
    if (!user) {
      user = await this.userService.createUser(
        id,
        displayName,
        email,
        profilePic,
        type,
      );
    }
    return user;
  }
}
