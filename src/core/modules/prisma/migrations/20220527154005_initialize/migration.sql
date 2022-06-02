-- CreateTable
CREATE TABLE "account" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_email" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "account_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed_at" TIMESTAMPTZ,
    "primary" BOOLEAN NOT NULL,
    "email" VARCHAR NOT NULL,

    CONSTRAINT "account_email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_email_confirmation_request" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmation_code" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "account_email_confirmation_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_password" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "account_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ,
    "password" VARCHAR NOT NULL,

    CONSTRAINT "account_password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_password_reset_request" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "password_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reset_code" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "account_password_reset_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "account_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,

    CONSTRAINT "account_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_activity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "account_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" VARCHAR NOT NULL,
    "subject" VARCHAR,
    "meta" JSON,

    CONSTRAINT "account_activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_account_id_key" ON "account_email"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_email_email_key" ON "account_email"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_email_confirmation_request_email_id_key" ON "account_email_confirmation_request"("email_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_email_confirmation_request_confirmation_code_key" ON "account_email_confirmation_request"("confirmation_code");

-- CreateIndex
CREATE UNIQUE INDEX "account_password_account_id_key" ON "account_password"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_password_reset_request_password_id_key" ON "account_password_reset_request"("password_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_password_reset_request_reset_code_key" ON "account_password_reset_request"("reset_code");

-- CreateIndex
CREATE UNIQUE INDEX "account_profile_account_id_key" ON "account_profile"("account_id");

-- AddForeignKey
ALTER TABLE "account_email" ADD CONSTRAINT "account_email_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_email_confirmation_request" ADD CONSTRAINT "account_email_confirmation_request_email_id_fkey" FOREIGN KEY ("email_id") REFERENCES "account_email"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_password" ADD CONSTRAINT "account_password_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_password_reset_request" ADD CONSTRAINT "account_password_reset_request_password_id_fkey" FOREIGN KEY ("password_id") REFERENCES "account_password"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_profile" ADD CONSTRAINT "account_profile_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_activity" ADD CONSTRAINT "account_activity_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
