import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { User } from 'src/user/entities/user.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { PlansModule } from 'src/plans/plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Plan, User]), PlansModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
