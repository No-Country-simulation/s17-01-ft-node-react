import { Component } from 'src/components/entities/component.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => Component, (component) => component.categories)
  components: Component[];
}
