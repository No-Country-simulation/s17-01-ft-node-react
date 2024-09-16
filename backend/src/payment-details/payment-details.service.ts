import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentDetails } from './entities/payment-details.entity';
import { CreatePaymentDetailDto } from './dto/create-payment-detail.dto';
import { UpdatePaymentDetailDto } from './dto/update-payment-detail.dto';

@Injectable()
export class PaymentDetailsService {
  constructor(
    @InjectRepository(PaymentDetails)
    private readonly paymentDetailsRepository: Repository<PaymentDetails>,
  ) {}

  async create(createPaymentDetailDto: CreatePaymentDetailDto): Promise<PaymentDetails> {
    const paymentDetail = this.paymentDetailsRepository.create(createPaymentDetailDto);
    try {
      return await this.paymentDetailsRepository.save(paymentDetail);
    } catch (error) {
      throw new InternalServerErrorException('Error creating payment detail');
    }
  }

  async findAll(): Promise<PaymentDetails[]> {
    const paymentsDetails = await this.paymentDetailsRepository.find()
    if(paymentsDetails.length === 0){
      throw new NotFoundException('No payments details available');
    }
    return paymentsDetails;

  }

  async findOne(id: number): Promise<PaymentDetails> {
    try {
      const paymentDetail = await this.paymentDetailsRepository.findOneBy({ id });
      if (!paymentDetail) {
        throw new NotFoundException(`Payment detail with ID ${id} not found`);
      }
      return paymentDetail;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching payment detail');
    }
  }

  async update(id: number, updatePaymentDetailDto: UpdatePaymentDetailDto): Promise<PaymentDetails> {
    const paymentDetail = await this.paymentDetailsRepository.preload({
      id,
      ...updatePaymentDetailDto,
    });

    if (!paymentDetail) {
      throw new NotFoundException(`Payment detail with ID ${id} not found`);
    }

    try {
      return await this.paymentDetailsRepository.save(paymentDetail);
    } catch (error) {
      throw new InternalServerErrorException('Error updating payment detail');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.paymentDetailsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payment detail with ID ${id} not found`);
    }
    return {
      message: `Payment detail with ID ${id} has been removed successfully`,
    };
  }
}
