import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
// import { PrismaService } from "./prisma/prisma.service";
import { supabase } from "./supabase/supabase_client";

@ApiTags("app")
@Controller()
export class AppController {
  // constructor(private readonly prisma: PrismaService) { }



  @Get("sales")
  async getSales() {
    const { data, error } = await supabase
      .from('Products')
      .select('*')
      .eq('id', 1)

    if (error) {
      console.error(error);
    }
    console.log(data);

    return data[0].sales;
  }

  @Get("debtors")
  async getDebtors() {
    const { data, error } = await supabase
      .from('Products')
      .select('*')
      .eq('id', 1)

    if (error) {
      console.error(error);
    }
    console.log(data);

    return data[0].debtor;
  }

  @Get("payments")
  async getPayments() {
    // const payments = await this.prisma.product.findUnique({
    //   where: {
    //     id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b"
    //   }
    // })
    // if (!payments) {
    //   return "[]";
    // }

    const { data, error } = await supabase
      .from('Products')
      .select('*')
      .eq('id', 1)

    if (error) {
      console.error(error);
    }
    console.log(data);

    return data[0].payments;
  }

  @Post("sales")
  async createSales(@Body() body: { sales: string }) {
    // const sales = await this.prisma.product.update({
    //   where: { id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b" },
    //   data: { sales: body.sales }
    // })
    // if (!sales) {
    //   return "[]";
    // }

    // return sales.sales || "[]";

    const { data: product, error: error2 } = await supabase
      .from('Products')
      .update({
        sales: JSON.stringify(body.sales),
      })
      .eq('id', 1).select();

    return product[0].sales || "[]";
  }

  @Post("debtors")
  async createDebtors(@Body() body: { debtors: string }) {
    const { data: product, error: error2 } = await supabase
      .from('Products')
      .update({
        debtor: JSON.stringify(body.debtors),
      })
      .eq('id', 1).select();

    return product[0].debtor || "[]";
  }

  @Post("payments")
  async createPayments(@Body() body: { payments: string }) {
    const { data: product, error: error2 } = await supabase
      .from('Products')
      .update({
        payments: JSON.stringify(body.payments),
      })
      .eq('id', 1).select();

    return product[0].payments || "[]";
  }
}
