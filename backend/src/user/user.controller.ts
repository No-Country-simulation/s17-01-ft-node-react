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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ImagesService } from 'src/images/images.service';
import { User } from './entities/user.entity';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req: Request, file: Express.Multer.File) => ({
    folder: 'avatars',
    transformation: [
      {
        width: 300,
        height: 300,
        crop: 'fill',
      },
      {
        quality: 'auto',
        fetch_format: 'auto',
      },
    ],
    public_id: `avatar-${Date.now()}`,
  }),
});

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly imagesService: ImagesService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('subscription')
  @UseGuards(JwtAuthGuard)
  async userSubscription(@Req() req) {
    const userId = req.user.id;
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      throw new BadRequestException('Invalid user ID');
    }
    return await this.userService.findUserSubscription(parsedUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('components')
  async userComponents(@Req() req) {
    const userId = req.user.id;
    return await this.userService.findUserComponents(userId);
  }

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
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const userId = req.user.id;
    return await this.userService.updateAvatar(userId, file.path);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<Partial<User>> {
    return this.userService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
