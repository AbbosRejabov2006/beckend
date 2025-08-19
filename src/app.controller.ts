import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrismaService } from "./prisma/prisma.service";

@ApiTags("app")
@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) { }


  @Post("login")
  async login(@Body() body: { login: string; password: string }) {

    const user = await this.prisma.user.findFirst({
      where: { username: body.login },
    });

    if (!user) {
      return await this.prisma.user.create({
        data: {
          username: body.login,
          password: body.password,
        },
      });
    }

    if (user.password !== body.password) {
      throw new HttpException("Invalid password", HttpStatus.UNAUTHORIZED);
    }

    return user;
  }


  @Get("sales")
  async getSales() {
    const sales = await this.prisma.product.findUnique({
      where: {
        id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b"
      }
    })
    if (!sales) {
      return "[]";
    }
    return sales.sales || "[]";
  }

  @Get("debtors")
  async getDebtors() {
    const debtors = await this.prisma.product.findUnique({
      where: {
        id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b"
      }
    })
    if (!debtors) {
      return "[]";
    }
    return debtors.debtor || "[]";
  }

  @Get("payments")
  async getPayments() {
    const payments = await this.prisma.product.findUnique({
      where: {
        id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b"
      }
    })
    if (!payments) {
      return "[]";
    }
    return payments.payments || "[]";
  }

  @Post("sales")
  async createSales(@Body() body: { sales: string }) {
    const sales = await this.prisma.product.update({
      where: { id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b" },
      data: { sales: body.sales }
    })
    if (!sales) {
      return "[]";
    }
    return sales.sales || "[]";
  }

  @Post("debtors")
  async createDebtors(@Body() body: { debtors: string }) {
    const debtors = await this.prisma.product.update({
      where: { id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b" },
      data: { debtor: body.debtors }
    })
    if (!debtors) {
      return "[]";
    }
    return debtors.debtor || "[]";
  }

  @Post("payments")
  async createPayments(@Body() body: { payments: string }) {
    const payments = await this.prisma.product.update({
      where: { id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b" },
      data: { payments: body.payments }
    })
    if (!payments) {
      return "[]";
    }
    return payments.payments || "[]";
  }
}
