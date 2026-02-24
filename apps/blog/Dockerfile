FROM node:lts-alpine AS pnpm

RUN npm install -g pnpm && pnpm config set store-dir ~/.pnpm-store

FROM pnpm AS installer

WORKDIR /app

COPY apps/blog/package.json apps/blog/package.json
COPY apps/server/package.json apps/server/package.json

COPY packages/form/package.json packages/form/package.json
COPY packages/schema/package.json packages/schema/package.json
COPY packages/ui/package.json packages/ui/package.json

COPY package.json package.json
COPY pnpm-workspace.yaml pnpm-workspace.yaml

# ? skip for now

# COPY . .

# RUN find . -type f ! -name package.json ! -name pnpm-workspace.yaml ! -name turbo.json -delete

# RUN find . -type d \( -name node_modules -o -name .turbo \) -exec rm -rf {} +

# RUN find . -type d -empty -delete

RUN pnpm i --ignore-scripts

# RUN rm apps/blog/package.json
# RUN rm apps/server/package.json 

# RUN rm packages/form/package.json 
# RUN rm packages/schema/package.json 
# RUN rm packages/ui/package.json 

# RUN rm package.json 
# RUN rm pnpm-workspace.yaml

FROM pnpm AS code

WORKDIR /app

COPY . .

RUN find . -type f \( -name Dockerfile -o -name .env.sample -o -name .env -o -name .\*ignore -o -name README.md -o -name commitlint.config.ts -o -name biome.json -o -name tsconfig.tsbuildinfo \) -exec rm {} \;

RUN find . -type f \( -name pnpm-\*.yaml \) -exec rm {} \;

RUN find . -type d \( -name node_modules -o -name .turbo -o -name .git -o -name .husky  -o -name dist  -o -name build -o -name .vite -o -name .next -o -name .idea -o -name .vscode -o -name .tanstack \) -exec rm -rf {} +

FROM pnpm AS prunner

WORKDIR /app

COPY --from=installer app/ .

COPY --from=code app/ .

RUN pnpm turbo prune blog

FROM pnpm AS builder

WORKDIR /app

COPY --from=installer app/ .

COPY --from=prunner /app/out .

RUN rm -rf apps/server

RUN pnpm build:prod

FROM nginx:stable-alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/apps/blog/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]