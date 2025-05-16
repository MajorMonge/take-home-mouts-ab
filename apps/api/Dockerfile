FROM node:22-slim AS base
FROM base AS builder
RUN apt-get update
RUN apt-get install -y --no-install-recommends libc6
WORKDIR /app
RUN npm install -g turbo@^2.5.3
COPY . .

ARG SERVICE_PORT=3000
RUN turbo prune api --docker

FROM base AS installer
RUN apt-get update
RUN apt-get install -y --no-install-recommends libc6
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm ci

COPY --from=builder /app/out/full/ .

WORKDIR /app/apps/api
RUN npx prisma generate

WORKDIR /app
RUN npx turbo run build

FROM base AS runner
ARG SERVICE_PORT
WORKDIR /app

COPY --from=installer /app/ .

WORKDIR /app/apps/api

EXPOSE ${SERVICE_PORT}

CMD ["npm", "run", "start:prod"]