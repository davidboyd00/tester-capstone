import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rack } from './entities/rack.entity';
import { CreateRackDto } from './dto/create-rack.dto';

@Injectable()
export class RacksService {
    constructor(
        @InjectRepository(Rack)
        private readonly rackRepo: Repository<Rack>,
    ) {}

    async create(createDto: CreateRackDto): Promise<Rack> {
        const rack = this.rackRepo.create(createDto);
        return this.rackRepo.save(rack);
    }

    async findAll(): Promise<Rack[]> {
        return this.rackRepo.find();
    }
}