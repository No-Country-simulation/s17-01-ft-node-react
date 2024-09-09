import {
  Controller,
  UseGuards,
  Post,
  Request,
  UsePipes,
  Body,
} from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

import { AuthService } from './auth.service';

//DTO
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginUserDto: LoginUserDto, @Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register-request')
  @UsePipes()
  async registerRequest(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Request() req) {
    return this.authService.login(req.user);
  }
}
