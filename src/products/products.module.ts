import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
// import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EventsGateway } from './products.controller';

@Module({
  imports: [PrismaModule],
//   controllers: [ProductsController],

  providers: [ProductsService, EventsGateway],
  exports: [ProductsService, EventsGateway],
})
export class ProductsModule {}
