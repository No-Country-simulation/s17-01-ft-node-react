import { IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Plan } from 'src/plans/entities/plan.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateSubscriptionDto {
  @IsOptional()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  user: number;  // Ahora esperas solo el ID del usuario

  @IsNotEmpty()
  @IsInt()
  plan: number;  // Ahora esperas solo el ID del plan
}

