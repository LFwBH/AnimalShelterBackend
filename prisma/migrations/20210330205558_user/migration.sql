-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");
