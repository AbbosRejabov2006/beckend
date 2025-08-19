/*
  Warnings:

  - You are about to drop the `sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale_item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `debtor` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payments` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."sale_item" DROP CONSTRAINT "sale_item_saleId_fkey";

-- DropIndex
DROP INDEX "public"."product_barcode_key";

-- AlterTable
ALTER TABLE "public"."product" ADD COLUMN     "debtor" TEXT NOT NULL,
ADD COLUMN     "payments" TEXT NOT NULL,
ADD COLUMN     "sales" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."sale";

-- DropTable
DROP TABLE "public"."sale_item";

-- DropEnum
DROP TYPE "public"."PaymentMethod";
