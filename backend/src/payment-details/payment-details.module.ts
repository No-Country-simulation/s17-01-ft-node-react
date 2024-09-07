import { Module } from '@nestjs/common';
import { PaymentDetailsService } from './payment-details.service';
import { PaymentDetailsController } from './payment-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [PaymentDetailsController],
  providers: [PaymentDetailsService],
})
export class PaymentDetailsModule {}
