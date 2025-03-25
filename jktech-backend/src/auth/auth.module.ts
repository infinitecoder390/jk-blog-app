import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECREATE_KEY'), // Get the secret key from environment variables
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRY'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    FacebookStrategy,
    UserService,
    JwtService,
    JwtStrategy,
    JwtAuthGuard, // Provide the JWT auth guard here
  ],
  controllers: [AuthController],
  exports: [JwtStrategy],
})
export class AuthModule {}
