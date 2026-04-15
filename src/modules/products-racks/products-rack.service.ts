import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsRack } from './entities/products-rack.entity';
import { CreateProductsRackDto } from './dto/create-products-rack.dto';

@Injectable()
export class ProductsRackService {
    constructor(
        @InjectRepository(ProductsRack)
        private readonly productsRackRepo: Repository<ProductsRack>,
    ) {}

    async create(createDto: CreateProductsRackDto): Promise<ProductsRack> {
        const productsRack = this.productsRackRepo.create(createDto);
        return this.productsRackRepo.save(productsRack);
    }

    async findAll(): Promise<ProductsRack[]> {
        return this.productsRackRepo.find();
    }
}