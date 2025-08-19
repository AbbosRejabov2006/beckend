/*
  Warnings:

  - You are about to drop the `debtor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `debtor_payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_alert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `telegram_config` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "debtor_payment" DROP CONSTRAINT "debtor_payment_debtorId_fkey";

-- DropTable
DROP TABLE "debtor";

-- DropTable
DROP TABLE "debtor_payment";

-- DropTable
DROP TABLE "stock_alert";

-- DropTable
DROP TABLE "telegram_config";
