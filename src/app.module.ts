import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "./config/configuration";

import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ProductsModule } from "./products/products.module";
import { PrismaService } from "./prisma/prisma.service";
// import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),


    ThrottlerModule.forRoot([
      {
        ttl: 60_000, // 60 seconds in ms
        limit: 10000, // 10 requests per minute per IP
      },
    ]),

    ProductsModule,

  ],

  controllers: [AppController],
  providers: [AppService, PrismaService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule { }
