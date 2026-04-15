import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoresService {
  private readonly logger = new Logger(StoresService.name);

  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async findAll() {
    return this.storesRepository.find({ where: { isActive: true }, order: { name: 'ASC' } });
  }

  async findOne(id: number) {
    const store = await this.storesRepository.findOne({ where: { id } });
    if (!store) throw new NotFoundException('Tienda no encontrada');
    return store;
  }

  async create(dto: CreateStoreDto) {
    const store = this.storesRepository.create(dto);
    const saved = await this.storesRepository.save(store);
    this.logger.log(`Tienda creada: ${saved.name}`);
    return saved;
  }

  async update(id: number, dto: Partial<CreateStoreDto>) {
    await this.findOne(id);
    await this.storesRepository.update(id, dto);
    return this.findOne(id);
  }
}
