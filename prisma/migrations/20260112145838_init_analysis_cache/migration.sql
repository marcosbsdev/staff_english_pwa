-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "en_meaning" TEXT NOT NULL,
    "en_dev_context" TEXT NOT NULL,
    "en_professional_example" TEXT NOT NULL,
    "en_pronunciation_tip" TEXT NOT NULL,
    "pt_meaning" TEXT NOT NULL,
    "pt_dev_context" TEXT NOT NULL,
    "pt_professional_example" TEXT NOT NULL,
    "pt_pronunciation_tip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_term_key" ON "Analysis"("term");
