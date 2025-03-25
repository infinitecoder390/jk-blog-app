import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export interface RequestWithUser extends Request {
  user: User;
}
@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = req.user;

    // Create a JWT token
    const payload = { sub: user.id }; // You can customize the payload as needed
    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECREATE_KEY'),
    });

    // Convert user object to a string, then URL encode
    const userString = encodeURIComponent(JSON.stringify(user));

    // Redirect the user with both the user and the JWT token in the URL
    res.redirect(
      `${this.configService.get<string>('REACT_APP_API_WEB_URL')}/?user=${userString}&token=${encodeURIComponent(jwtToken)}`,
    );
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookAuth() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthCallback(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const user = req.user;

    // Create a JWT token
    const payload = { sub: user.id }; // You can customize the payload as needed
    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECREATE_KEY'),
    });

    // Convert user object to a string, then URL encode
    const userString = encodeURIComponent(JSON.stringify(user));

    // Redirect the user with both the user and the JWT token in the URL
    res.redirect(
      `${this.configService.get<string>('REACT_APP_API_WEB_URL')}/?user=${userString}&token=${encodeURIComponent(jwtToken)}`,
    );
  }
}
