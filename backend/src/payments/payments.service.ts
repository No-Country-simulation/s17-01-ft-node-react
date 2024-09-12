import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Component } from 'src/components/entities/component.entity';
import { User } from 'src/user/entities/user.entity';
import { PaymentResponseDto } from './dto/response-payment.dto';
import { Plan } from 'src/plans/entities/plan.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async create(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentResponseDto> {
    const { userId, componentId, planId, amount, status } = createPaymentDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }
    let component = null;
    if (componentId) {
      component = await this.componentRepository.findOne({
        where: { id: componentId },
      });
      if (!component) {
        throw new BadRequestException(
          `Component with ID ${componentId} not found`,
        );
      }
    }

    let plan = null;
    if (planId) {
      plan = await this.planRepository.findOne({
        where: { id: planId },
      });
      if (!plan) {
        throw new BadRequestException(`Plan with ID ${planId} not found`);
      }
    }
    const payment = this.paymentsRepository.create({
      user,
      amount,
      status,
      component,
      plan
    });
    const savedPayment = await this.paymentsRepository.save(payment);

    const paymentResponseDto: PaymentResponseDto = {
      id: savedPayment.id,
      amount: savedPayment.amount,
      date: savedPayment.date,
      status: savedPayment.status,
      user: {
        id: savedPayment.user.id,
        username: savedPayment.user.username,
        email: savedPayment.user.email,
      },
      component: component
        ? {
            id: savedPayment.component.id,
            name: savedPayment.component.name,
            price: savedPayment.component.price,
          }
        : null,  // Retorna null si no hay componente
      plan: plan
        ? {
            id: savedPayment.plan.id,
            name: savedPayment.plan.name,
          }
        : null, 
    };

    return paymentResponseDto;
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.paymentsRepository.find();
    if (payments.length === 0) {
      throw new NotFoundException('No payments details available');
    }
    return payments;
  }

  async findOne(id: number): Promise<PaymentResponseDto> {
    const payment = await this.paymentsRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.user', 'user')
      .leftJoinAndSelect('payment.plan', 'plan')
      .leftJoinAndSelect('payment.component', 'component')
      .where('payment.id = :id', { id })
      .getOne();

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    if (!payment.user) {
      throw new NotFoundException(`User associated with payment ID ${id} not found`);
    }
    const paymentResponse: PaymentResponseDto = {
      id: payment.id,
      amount: payment.amount,
      date: payment.date,
      status: payment.status,
      user: {
        id: payment.user.id,
        username: payment.user.username,
        email: payment.user.email,
      },
      component: payment.component
        ? { id:payment.component.id, name: payment.component.name, price: payment.component.price }
        : null,
      plan: payment.plan
        ? { id: payment.plan.id, name: payment.plan.name }
        : null, // Incluye si es necesario
    };

    return paymentResponse;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.paymentsRepository.preload({
      id,
      ...updatePaymentDto,
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return this.paymentsRepository.save(payment);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.paymentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return {
      message: `Payment with ID ${id} has been removed successfully`,
    };
  }
}
