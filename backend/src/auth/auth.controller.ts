import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register-request')
  async sendConfirmationEmail(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Post('register')
  async borrartodopapa(@Request() req) {
    return this.authService.login(req.user);
  }
}
