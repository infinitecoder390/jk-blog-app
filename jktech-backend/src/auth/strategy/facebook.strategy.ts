import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
export interface FacebookProfile {
  id: string;
  displayName: string;
  emails: { value: string }[];
  photos: { value: string }[];
}
type VerifyCallback = (error: any, user: any, info?: any) => void;
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID'), // Fetch clientID from .env
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'), // Fetch clientSecret from .env
      callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL'),
      profileFields: ['id', 'displayName', 'photos', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: FacebookProfile, // Use the custom typed profile
    done: VerifyCallback, // Correct typing of done callback
  ) {
    const { id, displayName, emails, photos } = profile;

    // Ensure emails and photos are safely accessed
    const email = emails?.[0]?.value;
    const photo = photos?.[0]?.value;

    // Call validateUser to get the user object
    const user = await this.authService.validateUser(
      id,
      displayName,
      email,
      photo,
      'facebook',
    );

    done(null, user); // Safely pass the user object to the done callback
  }
}
