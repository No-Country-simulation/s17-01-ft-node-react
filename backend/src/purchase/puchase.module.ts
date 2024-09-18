import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from 'src/images/images.module';
import { ConfigService } from '@nestjs/config';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { Component } from 'src/components/entities/component.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentsModule } from 'src/payments/payments.module';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Component, User, Payment]), UserModule, PaymentsModule, SubscriptionsModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [TypeOrmModule, PurchaseService],
})
export class PurchaseModule {}
