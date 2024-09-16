import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  @Get()
  async listImages() {
    const images = await this.imagesService.listImages();
    return { images };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':publicId')
  async getImage(@Param('publicId') publicId: string) {
    const imageUrl = await this.imagesService.getImage(publicId);
    return { imageUrl };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    await this.imagesService.deleteImage(publicId);
    return { message: 'Image deleted successfully' };
  }
}
