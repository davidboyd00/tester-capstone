import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsRackService } from '@modules/products-racks/products-rack.service';
import { CreateProductsRackDto } from './dto/create-products-rack.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('products-racks')
@Controller('products-racks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductsRackController {
    constructor(private readonly productsRackService: ProductsRackService) {}

    @Post()
    create(@Body() createDto: CreateProductsRackDto) {
        return this.productsRackService.create(createDto);
    }

    @Get()
    findAll() {
        return this.productsRackService.findAll();
    }
}