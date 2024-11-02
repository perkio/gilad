-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "requested_gateId" INTEGER;

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_requested_gateId_fkey" FOREIGN KEY ("requested_gateId") REFERENCES "gates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
