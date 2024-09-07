import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailService } from 'src/mail/mail.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [AuthService, MailService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
