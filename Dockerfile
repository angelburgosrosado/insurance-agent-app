# syntax=docker/dockerfile:1

FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
# Prisma config evaluates DATABASE_URL during generation; this is only a build-time
# placeholder and is never used to connect to a database.
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts
RUN pnpm exec prisma generate
COPY . .
RUN pnpm build

FROM node:22-slim AS runner
ENV NODE_ENV="production"
ENV PORT="8080"
ENV HOSTNAME="0.0.0.0"
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Next output tracing does not reliably include Prisma's generated native engine.
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/.pnpm/@prisma+client@*/node_modules/.prisma ./node_modules/.prisma

EXPOSE 8080
CMD ["node", "server.js"]

# Cloud Run supplies DATABASE_URL from Secret Manager at runtime.
