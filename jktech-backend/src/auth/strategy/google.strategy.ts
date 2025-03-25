import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
// Define a custom type for the Google profile
export interface GoogleProfile {
  id: string;
  displayName: string;
  emails: { value: string }[];
  photos: { value: string }[];
}
type VerifyCallback = (error: any, user: any, info?: any) => void;
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile, // Use the custom typed profile for Google
    done: VerifyCallback, // VerifyCallback is already typed correctly by Passport
  ) {
    const { id, displayName, emails, photos } = profile;
    // Safely access the first email and photo
    const email = emails?.[0]?.value;
    const photo = photos?.[0]?.value;

    // If either email or photo is missing, handle the error
    if (!email || !photo) {
      const error = new Error('Missing email or photo');
      return done(error, null); // Pass error to done callback
    }

    // Validate the user using the AuthService
    const user = await this.authService.validateUser(
      id,
      displayName,
      email,
      photo,
      'google',
    );

    done(null, user); // Safely pass the user object to the done callback
  }
}
