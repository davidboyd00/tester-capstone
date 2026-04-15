import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Check } from 'typeorm';

@Entity('products')
@Check('"quantity_sack" >= 0')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', comment: 'Categoría del producto' })
  type: string;

  @Column({ type: 'int', name: 'quantity_sack' })
  quantitySack: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 