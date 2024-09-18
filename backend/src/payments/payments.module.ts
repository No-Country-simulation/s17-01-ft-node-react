import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Component } from 'src/components/entities/component.entity';
import { Plan } from 'src/plans/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Component, Plan])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule {}
