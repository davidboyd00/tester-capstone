import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('racks')
export class Rack {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int'})
    storeId: number; // Mismo caso, cuando se relacione a Store usar @ManyToOne

    @Column({ type: 'varchar'})
    type: string;

    @Column({ type: 'int'})
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}