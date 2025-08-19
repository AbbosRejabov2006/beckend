import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: "stdout", level: "info" },
        { emit: "stdout", level: "warn" },
        { emit: "stdout", level: "error" },
        // 👉 Agar query loglarini ko‘rishni xohlasangiz, quyidagini ochib qo‘ying
        // { emit: "event", level: "query" },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log("✅ Connected to the database");

    // 👉 Debug uchun query logger (faqat development muhitida)
    if (process.env.NODE_ENV !== "production") {
      // this.$use(async (params, next) => {
      //   const before = Date.now();
      //   const result = await next(params);
      //   const duration = Date.now() - before;

      //   this.logger.debug(`🟡 Query: ${params.model}.${params.action}`);
      //   this.logger.debug(`⏱️ Duration: ${duration}ms`);

      //   return result;
      // });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("❌ Disconnected from the database");
  }

  /**
   * Development uchun bazani tozalash
   */
  async cleanDatabase() {
    if (process.env.NODE_ENV === "production") {
      throw new Error("❌ Cannot clean database in production");
    }

    // Foreign key constraintsni inobatga olib, to‘g‘ri tartibda truncate qilamiz
    const models = ["Payment", "Subscription", "Device", "User", "Plan"];

    this.logger.warn("⚠️ Cleaning database - all data will be erased");

    return this.$transaction(
      models.map((model) => {
        // dynamic access: this.user, this.device, this.payment va hokazo
        // @ts-ignore
        return this[model.toLowerCase()].deleteMany();
      }),
    );
  }
}
