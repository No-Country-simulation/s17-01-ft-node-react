import { Module } from '@nestjs/common';
import { PaymentDetailsService } from './payment-details.service';
import { PaymentDetailsController } from './payment-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDetails } from './entities/payment-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentDetails])],
  controllers: [PaymentDetailsController],
  providers: [PaymentDetailsService],
})
export class PaymentDetailsModule {}
