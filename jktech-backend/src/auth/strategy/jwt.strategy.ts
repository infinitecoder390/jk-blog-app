import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service'; // Service to get user by ID
import {
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

// Define the payload structure
export interface JwtPayload {
  sub: string; // User ID, can be customized
  username: string; // Additional user data
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECREATE_KEY'), // Secret key for JWT verification
    });
  }

  // The validate method checks if the user exists and returns user data.
  async validate(payload: JwtPayload) {
    try {
      // Check if the user exists based on the 'sub' field in the payload (user ID)
      const user = await this.userService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user; // The user object will be available in the request as req.user
    } catch (error) {
      // Handle JWT-specific errors (expired or invalid token)
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      } else {
        // For any other unexpected errors
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
}
