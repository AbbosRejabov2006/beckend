import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import configuration from "./config/configuration";

import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ProductsModule } from "./products/products.module";
// import { PrismaService } from "./prisma/prisma.service";
// import { CompanyModule } from './company/company.module';

@Module({
  imports: [

    ProductsModule,

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
