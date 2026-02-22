
# FROM node:lts-alpine AS base

# WORKDIR /app

# ? TODO move all copy and del to base

FROM node:lts-alpine AS prunner

WORKDIR /app

RUN npm install -g pnpm && pnpm config set store-dir ~/.pnpm-store

# todo!
COPY apps/blog/package.json apps/blog/package.json
COPY apps/server/package.json apps/server/package.json

COPY packages/form/package.json packages/form/package.json
COPY packages/schema/package.json packages/schema/package.json
COPY packages/ui/package.json packages/ui/package.json

COPY package.json package.json
COPY pnpm-workspace.yaml pnpm-workspace.yaml

RUN npm pkg delete scripts.prepare

RUN pnpm i --prod

COPY turbo.json turbo.json
COPY packages packages
COPY apps apps

RUN find . -type f \( -name Dockerfile -o -name .env* -o -name .*ignore \) -exec rm {} \;
# RUN find . -type d \( -name out -o -name dist -o -name build \) -exec rm {} \;
RUN find . -type d -name out -exec rm -rf {} +

RUN pnpm turbo prune server --docker

FROM node:lts-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm && pnpm config set store-dir ~/.pnpm-store

COPY --from=prunner /app/out/full .

RUN pnpm i

RUN pnpm build

RUN find . -type f -name tsconfig.* -exec rm {} \;
RUN find . -type d \( -name node_modules -o -name .turbo \) -exec rm -rf {} +
RUN rm -rf apps/server/src

FROM node:lts-alpine AS t

WORKDIR /app

RUN npm install -g pnpm && pnpm config set store-dir ~/.pnpm-store

COPY --from=builder /app .

ENV NODE_ENV=production

RUN pnpm i --prod

ENTRYPOINT ["pnpm", "start"]