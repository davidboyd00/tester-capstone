import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Store } from '../../stores/entities/store.entity';


@Entity('macro_goals')
export class MacroGoal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Store, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ type: 'int' }) 
  store_id: number;

  @Column({ type: 'varchar', comment: 'puede ser Anual o Mensual' })
  type: string;

  @Column({ 
    type: 'varchar', 
    length: 7, 
    comment: "Formato: 'YYYY' para anual (ej: 2026) o 'YYYY-MM' para mensual (ej: 2026-04)" 
  })
  period: string;

  @Column({ type: 'float', name: 'target_amount' })
  targetAmount: number;

  @Column({ type: 'float', name: 'actual_amount', default: 0 })
  actualAmount: number;

  @Column({ type: 'int', name: 'days_achieved', default: 0 })
  daysAchieved: number;

  @Column({ type: 'boolean', name: 'is_achieved', default: false })
  isAchieved: boolean;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}