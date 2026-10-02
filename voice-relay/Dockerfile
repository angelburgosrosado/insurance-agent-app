# Multi-stage optimized Dockerfile for MyIAD Twilio ConversationRelay Voice Server
FROM node:20-slim AS builder

WORKDIR /app

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy dependency manifests
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Copy application files needed by the voice server
COPY tsconfig.json ./
COPY src ./src
COPY voice-relay ./voice-relay

# Production runtime stage
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Enable pnpm in runner
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

# Copy source files
COPY --from=builder /app/src ./src
COPY --from=builder /app/voice-relay ./voice-relay
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Cloud Run defaults to port 8080
EXPOSE 8080

# Start voice relay server with tsx
CMD ["npx", "tsx", "voice-relay/server.ts"]
