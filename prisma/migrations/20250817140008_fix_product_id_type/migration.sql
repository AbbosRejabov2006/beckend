/*
  Warnings:

  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `minStock` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `sale_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sale_item" DROP CONSTRAINT "sale_item_productId_fkey";

-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "categoryId",
DROP COLUMN "createdAt",
DROP COLUMN "minStock",
DROP COLUMN "price",
DROP COLUMN "stock",
DROP COLUMN "unit",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "public"."sale_item" DROP COLUMN "productId";
