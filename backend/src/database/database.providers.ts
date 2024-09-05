import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as dotenv from 'dotenv';
import { PaymentDetails } from 'src/payment-details/entities/payment-details.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Component } from 'src/components/entities/component.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { Category } from 'src/categories/entities/category.entity';

dotenv.config();

console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User, Plan, PaymentDetails, Category],
        synchronize: true,
        ssl: false,
      });

      return dataSource.initialize();
    },
  },
];
