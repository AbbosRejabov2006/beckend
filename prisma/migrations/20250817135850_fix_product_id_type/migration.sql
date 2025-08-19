/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "public"."product" ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "stock" SET DEFAULT 0,
ALTER COLUMN "unit" SET DEFAULT 'pcs',
ALTER COLUMN "minStock" SET DEFAULT 0;
