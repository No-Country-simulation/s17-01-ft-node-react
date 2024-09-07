import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
// imp sub repo
// imp plan repo
// imp component repo

@Injectable()
export class SubscriptionsService {
  create(createSubscriptionDto: CreateSubscriptionDto) {
    // para asignar un plan al usuario
    const notes = {
      user_id: Number,
      plan_id: Number,
      quantity: Number,
      subscriptionDate: Date.now(),
      expirationDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 días
      // qty viene del plan
    };
    return 'This action adds a new subscription';
  }

  findOne(id: number) {
    // usar id de user para buscar subscription
    const notes = {
      user_id: Number,
    };
    // traer la subscription del usuario
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const notes = {
      user_id: Number, // --> busca la sub del user
      quantity: Number, // --> actualiza la cantidad
    };
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    // solo admin, borrando id user
    return `This action removes a #${id} subscription`;
  }
}
