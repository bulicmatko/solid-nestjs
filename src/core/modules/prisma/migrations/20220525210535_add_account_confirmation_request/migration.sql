-- AlterTable
ALTER TABLE "activity" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "company" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "email_confirmation_request" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "password_reset_request" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "permission" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- CreateTable
CREATE TABLE "account_confirmation_request" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "expires_at" TIMESTAMPTZ NOT NULL,
    "user_id" UUID NOT NULL,
    "code" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "account_confirmation_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_confirmation_request_user_id_key" ON "account_confirmation_request"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_confirmation_request_code_key" ON "account_confirmation_request"("code");

-- AddForeignKey
ALTER TABLE "account_confirmation_request" ADD CONSTRAINT "account_confirmation_request_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
