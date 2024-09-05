import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from 'src/user/entities/user.entity';
  
  @Entity()
  export class PaymentDetails {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    cbu: number;
  
    @Column()
    alias: string;
  
    @Column()
    name: string;
  
    @Column()
    cuil: number;
  
    @OneToOne(() => User, (user) => user.paymentDetails)
    @JoinColumn({ name: 'id_user' })
    user: User;
  }
  