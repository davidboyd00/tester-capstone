import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MacroGoal } from './entities/macro-goal.entity';
import { DailyGoal } from './entities/daily-goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MacroGoal, DailyGoal])],
  controllers: [],
  providers: [],
})
export class GoalsModule {} 