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

RUN pnpm turbo prune server --docker

FROM pnpm AS builder

WORKDIR /app

COPY --from=prunner /app/out/full .
COPY --from=installer /app .

RUN rm -rf apps/blog
RUN rm -rf packages/form
RUN rm -rf packages/ui

RUN find . -type d -empty -delete

RUN pnpm build

RUN find . -type f -name tsconfig.* -exec rm {} \;

RUN find . -type d \( -name node_modules -o -name .turbo \) -exec rm -rf {} +

RUN rm -rf apps/server/src
RUN rm pnpm-lock.yaml

RUN npm pkg delete scripts.prepare

FROM node:lts-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm && pnpm config set store-dir ~/.pnpm-store

COPY --from=builder /app .

ENV NODE_ENV=production

RUN pnpm i --prod

ARG ENV="dev"
ARG FRONTEND_URLS="http://localhost:5173,http://localhost:4173,http://localhost:3000"
ARG MONGO_URI=""
ARG JWT_SECRET=""
ARG LEBEL="fatal"
ARG REDIS_URI

# RUN printf "ENV=${env}\nFRONTEND_URLS=${FRONTEND_URLS}\nMONGO_URI=${MONGO_URI}\nJWT_SECRET=${JWT_SECRET}\nLEBEL=${LEBEL}\nREDIS_URI=${REDIS_URI}\nPUB_SUB=${PUB_SUB}" > .env

# ENV ENV=${ENV}
# ENV FRONTEND_URLS=${FRONTEND_URLS}
# ENV MONGO_URI=${MONGO_URI}
# ENV JWT_SECRET=${JWT_SECRET}
# ENV LABEL=${LABEL}
# ENV REDIS_URI=${REDIS_URI}

COPY server.sh server.sh

CMD [ "sh" , "server.sh"]