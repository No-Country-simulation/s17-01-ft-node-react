import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Plan } from 'src/plans/entities/plan.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateSubscriptionDto {
  @IsInt()
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;

  @ValidateNested()
  @Type(() => User)
  user: User;

  @Type(() => Plan)
  @ValidateNested()
  plan: Plan;
}
