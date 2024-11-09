-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mbti" TEXT;

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "hard_skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "soft_skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "work_experience" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "formatOfWork" TEXT,
    "employmentType" TEXT,
    "experience" DOUBLE PRECISION,
    "salary" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "position" TEXT,
    "location" TEXT,
    "additional" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "summary" TEXT,
    "contacts" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "evaluation" DOUBLE PRECISION,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "hard_skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "soft_skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "formatOfWork" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "employmentType" TEXT,
    "salary" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "task" TEXT,
    "additional" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "contacts" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationVacancy" (
    "applicationId" INTEGER NOT NULL,
    "vacancyId" INTEGER NOT NULL,
    "match" DOUBLE PRECISION,

    CONSTRAINT "ApplicationVacancy_pkey" PRIMARY KEY ("applicationId","vacancyId")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationVacancy" ADD CONSTRAINT "ApplicationVacancy_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationVacancy" ADD CONSTRAINT "ApplicationVacancy_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
