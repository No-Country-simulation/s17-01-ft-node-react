import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Plan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('int')
    quantity: number;

    @Column('simple-array')
    tiers: string[];
}
