import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.components)
  uploader: User;

  @ManyToMany(() => User, (user) => user.myComponents)
  buyers: User[];
}
