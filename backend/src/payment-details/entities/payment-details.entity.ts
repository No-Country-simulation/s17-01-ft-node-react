import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity()
export class PaymentDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cbu: string;

  @Column()
  alias: string;

  @Column()
  name: string;

  @Column()
  cuil: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
