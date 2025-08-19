/*
  Warnings:

  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `permissions` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `driver_boards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gross_boards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gross_companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spread_sheet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."company" DROP CONSTRAINT "company_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."device" DROP CONSTRAINT "device_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."driver_boards" DROP CONSTRAINT "driver_boards_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."gross_boards" DROP CONSTRAINT "gross_boards_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."gross_companies" DROP CONSTRAINT "gross_companies_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."payment" DROP CONSTRAINT "payment_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."payment" DROP CONSTRAINT "payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."spread_sheet" DROP CONSTRAINT "spread_sheet_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."subscription" DROP CONSTRAINT "subscription_planId_fkey";

-- DropForeignKey
ALTER TABLE "public"."subscription" DROP CONSTRAINT "subscription_userId_fkey";

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "permissions",
DROP COLUMN "role",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "public"."category";

-- DropTable
DROP TABLE "public"."company";

-- DropTable
DROP TABLE "public"."device";

-- DropTable
DROP TABLE "public"."driver_boards";

-- DropTable
DROP TABLE "public"."gross_boards";

-- DropTable
DROP TABLE "public"."gross_companies";

-- DropTable
DROP TABLE "public"."payment";

-- DropTable
DROP TABLE "public"."plan";

-- DropTable
DROP TABLE "public"."spread_sheet";

-- DropTable
DROP TABLE "public"."subscription";

-- DropEnum
DROP TYPE "public"."UserRole";
