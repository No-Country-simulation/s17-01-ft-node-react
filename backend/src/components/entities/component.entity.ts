import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Plan } from 'src/plans/entities/plan.entity';

@Entity()
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.myComponents, { eager: true })
  @JoinColumn({ name: 'uploader_id', referencedColumnName: 'id' })
  uploader: User;

  @ManyToMany(() => User, (user) => user.components)
  buyers: User[];

  @Column({ type: 'float' })
  price: number;

  @ManyToMany(() => Category, (category) => category.components)
  @JoinTable({
    name: 'component_categories',
    joinColumn: { name: 'component_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];

  @ManyToOne(() => Plan, (plan) => plan.subscriptions)
  @JoinColumn({
    name: 'plan_id',
    referencedColumnName: 'id',
  })
  plan: Plan;

  @Column({ nullable: true })
  styles?: string;

  @Column()
  structure: string;

  @Column({nullable: true })
  tier: string; // Define el nivel del componente


  @Column({ type: 'float' ,nullable: true })
  rating: number;

  @Column()
  description: string;

  @Column()
  video: string;

  @Column()
  image: string;

  @Column()
  readme: string;

  @Column({ type: 'int' ,nullable: true })
  downloads: number;
}
