import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { Component } from 'src/components/entities/component.entity';
import { PaymentDetails } from 'src/payment-details/entities/payment-details.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category, Plan, Component, PaymentDetails]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
