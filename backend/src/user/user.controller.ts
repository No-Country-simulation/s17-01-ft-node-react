import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  userProfile(@Req() req) {
    return {
      status: 'success',
      message: 'User profile found.',
      payload: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-components')
  async userMyComponents(@Req() req) {
    const userId = req.user.id;
    return await this.userService.findUserMyComponents(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('components')
  async userComponents(@Req() req) {
    const userId = req.user.id;
    return await this.userService.findUserComponents(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('payments')
  async userPayments(@Req() req) {
    const userId = req.user.id;
    return await this.userService.findUserPayments(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('payment-details')
  async userPaymentDetails(@Req() req) {
    const userId = req.user.id;
    return await this.userService.findUserPaymentDetails(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('subscription')
  async userSubscription(@Req() req) {
    const userId = req.user.id;
    return await this.userService.findUserSubscription(userId);
  }
}
