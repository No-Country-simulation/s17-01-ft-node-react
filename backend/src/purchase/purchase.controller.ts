import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { PurchaseService } from './purchase.service';
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  import { RolesGuard } from 'src/auth/guards/roles.guard';
  import { Roles } from 'src/auth/decorators/roles.decorator';
  import { Request } from 'express';
  
  @Controller('purchase')
  export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) {}
  
    @Post('component')
    @UseGuards(JwtAuthGuard)
    async purchaseComponent(
      @Body() body: { componentId: number; paymentId?: number; subscriptionId?: number },
      @Req() req // Se obtiene el usuario autenticado del token JWT
    ) {
      const { componentId, paymentId, subscriptionId } = body;
      const userId = req.user.id;
      if (!componentId) {
        throw new HttpException('El ID del componente es requerido', HttpStatus.BAD_REQUEST);
      }
      if (paymentId) {
        return await this.purchaseService.purchaseComponentDirect(userId, componentId, paymentId);
      }
      if (subscriptionId) {
        return await this.purchaseService.purchaseComponentWithSubscription(userId, componentId, subscriptionId);
      }
      throw new HttpException('Falta el paymentId o el subscriptionId', HttpStatus.BAD_REQUEST);
    }
  }
  