import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { PaymentDetails } from 'src/payment-details/entities/payment-details.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Component } from 'src/components/entities/component.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'USER' })
  role: string;

  @OneToOne(() => PaymentDetails, { nullable: true })
  @JoinColumn({ name: 'id_PaymentDetails' })
  paymentDetails?: PaymentDetails;

  // @OneToOne(() => Subscription, { nullable: true })
  // @JoinColumn({ name: 'id_Subscription' })
  // subscription?: Subscription;

  // @OneToMany(() => Component, (component) => component.uploader)
  // components: Component[];

  // @ManyToMany(() => Component, (component) => component.buyers)
  // @JoinTable({ name: 'user_components' })
  // myComponents: Component[];

  @Column({ type: 'float', nullable: true })
  rating?: number;

  // @OneToMany(() => Payment, (payment) => payment.user)
  // payments: Payment[];
}
