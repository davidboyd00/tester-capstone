import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rack } from './entities/rack.entity';
import { RacksService } from './racks.service';
import { RacksController } from './racks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rack])],
  controllers: [RacksController],
  providers: [RacksService],
  exports: [RacksService],
})
export class RacksModule {}