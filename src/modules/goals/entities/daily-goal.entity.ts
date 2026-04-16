import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Store } from '../../stores/entities/store.entity';


@Entity('daily_goals')
export class DailyGoal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Store, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ type: 'int' }) 
  store_id: number;

  @Column({ type: 'date', comment: 'Fecha de la meta en formato YYYY-MM-DD' })
  date: string;

  @Column({ type: 'float', name: 'target_amount' })
  targetAmount: number;

  @Column({ type: 'float', name: 'actual_amount', default: 0 })
  actualAmount: number;

  @Column({ type: 'boolean', name: 'is_achieved', default: false })
  isAchieved: boolean;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}