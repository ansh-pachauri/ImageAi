-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
