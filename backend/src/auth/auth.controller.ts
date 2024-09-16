import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Patch,
} from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';

import { AuthService } from './auth.service';

//DTO
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EmailTokenDto } from './dto/email-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetRequestDto } from './dto/reset-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginInfo: LoginUserDto, @Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register-request')
  async registerRequest(@Body() registerInfo: CreateUserDto) {
    return this.authService.sentConfirmationEmail(registerInfo);
  }

  @Post('register')
  async register(@Body() registerTokenInfo: EmailTokenDto) {
    return this.authService.registerUser(registerTokenInfo.token);
  }

  @Post('reset-request')
  async resetPasswordRequest(@Body() resetRequestInfo: ResetRequestDto) {
    return this.authService.sentResetPasswordEmail(resetRequestInfo);
  }

  @Patch('reset-password')
  async resetPassword(@Body() resetPasswordInfo: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordInfo);
  }
}
