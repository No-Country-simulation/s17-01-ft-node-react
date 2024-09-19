import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ImagesModule } from 'src/images/images.module';
import { ConfigService } from '@nestjs/config';
import { ComponentsModule } from 'src/components/components.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ImagesModule, ComponentsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
