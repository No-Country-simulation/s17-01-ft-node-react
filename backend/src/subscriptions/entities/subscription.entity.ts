import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Plan } from 'src/plans/entities/plan.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  subscriptionDate: Date;

  @Column({ type: 'timestamp' })
  expirationDate: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Plan)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;
}
