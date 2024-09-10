import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { Plan } from '../plans/entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const { user, plan, quantity } = createSubscriptionDto;

    const foundUser = await this.userRepository.findOneBy({ id: user.id });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${user.id} not found`);
    }

    const foundPlan = await this.planRepository.findOneBy({ id: plan.id });
    if (!foundPlan) {
      throw new NotFoundException(`Plan with ID ${plan.id} not found`);
    }

    const subscription = this.subscriptionRepository.create({
      user: foundUser,
      plan: foundPlan,
      quantity,
      subscriptionDate: new Date(),
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
    });

    return this.subscriptionRepository.save(subscription);
  }

  async findOne(id: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['user', 'plan'],
    });
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    return subscription;
  }

  async update(
    id: number,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOneBy({ id });
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    const { quantity } = updateSubscriptionDto;
    subscription.quantity = quantity;

    return this.subscriptionRepository.save(subscription);
  }

  async remove(id: number): Promise<void> {
    const subscription = await this.subscriptionRepository.findOneBy({ id });
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    await this.subscriptionRepository.remove(subscription);
  }
}
