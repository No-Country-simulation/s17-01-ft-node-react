import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';

import { AuthService } from './auth.service';

//DTO
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RegisterTokenDto } from './dto/register-token.dto';

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
  async register(@Body() registerTokenInfo: RegisterTokenDto) {
    return this.authService.registerUser(registerTokenInfo.token);
  }
}
