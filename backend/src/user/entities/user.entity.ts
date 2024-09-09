import {
  Entity,
  Index,
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

  @Index()
  @Column({ unique: true })
  username: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'USER' })
  role: string;

  @Column({ type: 'float', nullable: true })
  rating?: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => PaymentDetails, (paymentDetails) => paymentDetails.user, {
    nullable: true,
  })
  paymentDetails?: PaymentDetails;

  @OneToOne(() => Subscription, { nullable: true })
  subscription?: Subscription;

  @OneToMany(() => Component, (component) => component.uploader)
  myComponents: Component[];

  @ManyToMany(() => Component, (component) => component.buyers)
  @JoinTable({
    name: 'user_components',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'component_id' },
  })
  components: Component[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
}
