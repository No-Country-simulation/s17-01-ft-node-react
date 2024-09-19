import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PaymentsService } from 'src/payments/payments.service';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { UpdateSubscriptionDto } from 'src/subscriptions/dto/update-subscription.dto';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly usersService: UserService,
    private readonly paymentsService: PaymentsService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  // Compra directa de un componente
  async purchaseComponentDirect(
    userId: number,
    componentId: number,
    paymentId: number,
  ) {
    // Verificar si el pago es válido
    const payment = await this.paymentsService.findOne(+paymentId);
    console.log('Payment:', payment);
    console.log('componentId:', componentId);
    console.log('payment.component.id:', payment.component.id);
    console.log('userId:', userId);
    console.log('payment.user.id:', payment.user.id);

    if (!payment) {
      throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
    }
  
    if (payment.component.id !== componentId) {
      throw new HttpException('El ID del componente del pago no coincide con el del componente', HttpStatus.FORBIDDEN);
    }
  
    if (payment.user.id !== userId) {
      throw new HttpException('El ID del usuario no coincide con el del componente', HttpStatus.FORBIDDEN);
    }
    // Agregar el componente al usuario
    const user = await this.usersService.addComponentToUser(
      userId,
      componentId,
    );
    return {
      message: 'Componente adquirido exitosamente por compra directa',
      user,
    };
  }

  // Compra de un componente mediante suscripción
  async purchaseComponentWithSubscription(
    userId: number,
    componentId: number,
    subscriptionId: number,
  ) {
    const subscription =
      await this.subscriptionsService.findOne(subscriptionId);
      if (!subscription) {
        throw new HttpException(
          'Suscripción no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
      if (subscription.user.id !== userId) {
        console.log("subscription.user.id:",subscription.user.id)
        console.log("userId:",userId)
        throw new HttpException(
          'La suscripción no pertenece al usuario',
          HttpStatus.FORBIDDEN,
        );
      }
      if (subscription.quantity <= 0) {
        throw new HttpException(
          'La suscripción no tiene capacidad para más componentes',
          HttpStatus.FORBIDDEN,
        );
      }
    const updateSubscriptionDto: UpdateSubscriptionDto = {
      quantity: subscription.quantity - 1,
    };
    // Restar uno al quantity de la suscripción
    await this.subscriptionsService.update(
      subscriptionId,
      updateSubscriptionDto,
    );
    // Agregar el componente al usuario
    const user = await this.usersService.addComponentToUser(
      userId,
      componentId,
    );

    return {
      message: 'Componente adquirido exitosamente mediante suscripción',
      user,
    };
  }
}
