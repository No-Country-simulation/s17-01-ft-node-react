import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { Component } from 'src/components/entities/component.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @ManyToOne(() => Plan, { nullable: true })
  @JoinColumn({ name: 'plan_id' })
  plan?: Plan;

  @ManyToOne(() => Component, { nullable: true })
  @JoinColumn({ name: 'component_id' })
  component?: Component;
}
