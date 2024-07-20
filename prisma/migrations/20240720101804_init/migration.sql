-- CreateTable
CREATE TABLE "account" (
    "accountNo" INTEGER NOT NULL,
    "currentBal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("accountNo")
);

-- CreateTable
CREATE TABLE "transactions" (
    "transactionId" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "oldBalance" DOUBLE PRECISION NOT NULL,
    "newBalance" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "flag" TEXT,
    "alertType" TEXT,
    "details" TEXT,
    "accountNo" INTEGER NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("transactionId")
);
