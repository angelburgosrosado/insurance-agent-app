# Multi-stage optimized Dockerfile for MyIAD Twilio ConversationRelay Voice Server
FROM node:20-slim

WORKDIR /app

# Install system dependencies needed for OpenSSL and networking
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy dependency manifests and prisma schema so postinstall doesn't fail
COPY package.json pnpm-lock.yaml* prisma.config.ts* ./
COPY prisma ./prisma/

# Install production dependencies without running unneeded client build scripts
RUN pnpm install --prod --frozen-lockfile --ignore-scripts || pnpm install --prod --ignore-scripts

# Copy application files needed by the voice server
COPY tsconfig.json ./
COPY src ./src
COPY voice-relay ./voice-relay

# Cloud Run defaults
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start voice relay server with tsx
CMD ["npx", "tsx", "voice-relay/server.ts"]
