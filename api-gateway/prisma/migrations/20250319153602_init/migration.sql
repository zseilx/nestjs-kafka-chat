-- CreateTable
CREATE TABLE "SocialAuth" (
    "id" VARCHAR(25) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "provider" VARCHAR(16) NOT NULL,
    "providerId" VARCHAR(254) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSession" (
    "id" VARCHAR(25) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "refreshToken" VARCHAR(16) NOT NULL,
    "deviceId" VARCHAR(254) NOT NULL,
    "deviceName" VARCHAR(255) NOT NULL,
    "ip" VARCHAR(45),
    "userAgent" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" VARCHAR(25) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "role" VARCHAR(25) NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SocialAuth_userId_idx" ON "SocialAuth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAuth_provider_providerId_key" ON "SocialAuth"("provider", "providerId");

-- CreateIndex
CREATE INDEX "UserSession_userId_idx" ON "UserSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_refreshToken_deviceId_key" ON "UserSession"("refreshToken", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_role_key" ON "UserRole"("role");

-- CreateIndex
CREATE INDEX "UserRole_userId_idx" ON "UserRole"("userId");
