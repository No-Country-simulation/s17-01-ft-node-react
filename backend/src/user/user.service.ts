import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.error('Error saving user:', error);
      throw new InternalServerErrorException('Failed to create user.');
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.findOneById(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      message: `User with ID ${id} has been removed successfully`,
    };
  }

  async findUserMyComponents(
    id: number,
  ): Promise<{ status: string; message: string; payload: any }> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['myComponents'],
    });
    if (user.myComponents.length === 0) {
      throw new NotFoundException(`The user has not uploaded any components.`);
    }
    return {
      status: 'success',
      message: 'Uploaded components successfully retrieved.',
      payload: user.myComponents,
    };
  }

  async findUserComponents(
    id: number,
  ): Promise<{ status: string; message: string; payload: any }> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['components'],
    });
    if (user.components.length === 0) {
      throw new NotFoundException(`The user has not purchased any components.`);
    }
    return {
      status: 'success',
      message: 'Purchased components successfully retrieved.',
      payload: user.components,
    };
  }

  async findUserPayments(
    id: number,
  ): Promise<{ status: string; message: string; payload: any }> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['payments'],
    });
    if (user.payments.length === 0) {
      throw new NotFoundException(`The user has not made any payments.`);
    }
    return {
      status: 'success',
      message: 'Payments successfully retrieved.',
      payload: user.payments,
    };
  }

  async findUserPaymentDetails(
    id: number,
  ): Promise<{ status: string; message: string; payload: any }> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['paymentDetails'],
    });
    if (!user.paymentDetails) {
      throw new NotFoundException(
        `The user has not updated their payment details.`,
      );
    }
    return {
      status: 'success',
      message: 'Payment details successfully retrieved.',
      payload: user.paymentDetails,
    };
  }

  async findUserSubscription(
    id: number,
  ): Promise<{ status: string; message: string; payload: any }> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['subscription'],
    });
    if (!user.subscription) {
      throw new NotFoundException(
        `The user does not have an active subscription.`,
      );
    }
    return {
      status: 'success',
      message: 'Subscription successfully retrieved.',
      payload: user.subscription,
    };
  }

  async updateAvatar(
    id: number,
    imageUrl: string,
  ): Promise<{ status: string; message: string; payload: any }> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.avatar = imageUrl;
    await this.userRepository.save(user);

    return {
      status: 'success',
      message: 'User avatar has been updated',
      payload: imageUrl,
    };
  }
}
