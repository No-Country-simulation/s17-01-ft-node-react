import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { Plan } from '../plans/entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { QueryFailedError } from 'typeorm';

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
    const { user, plan } = createSubscriptionDto;

    const foundUser = await this.userRepository.findOneBy({ id: user });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${user} not found`);
    }

    const foundPlan = await this.planRepository.findOneBy({ id: plan });
    if (!foundPlan) {
      throw new NotFoundException(`Plan with ID ${plan} not found`);
    }

    // Verificar si ya existe una suscripción para el mismo usuario y plan
    const existingSubscription = await this.subscriptionRepository.findOne({
      where: { user: foundUser, plan: foundPlan },
    });
    if (existingSubscription) {
      throw new ConflictException(
        'Subscription for this user and plan already exists',
      );
    }

    const subscription = this.subscriptionRepository.create({
      user: foundUser,
      plan: foundPlan,
      quantity: foundPlan.quantity,
      subscriptionDate: new Date(),
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
    });

    try {
      return await this.subscriptionRepository.save(subscription);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new ConflictException(
          'Subscription for this user and plan already exists',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Subscription[]> {
    const subscriptions = await this.subscriptionRepository.find();
    if (subscriptions.length === 0) {
      throw new NotFoundException('No subscriptions available');
    }
    return subscriptions;
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
