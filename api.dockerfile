FROM node:12.18.0-alpine AS build
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

COPY packages/shared ./packages/shared
COPY packages/api ./packages/api

RUN yarn install --pure-lockfile --frozen-lockfile --non-interactive

RUN yarn build:shared
RUN yarn build:api

FROM node:12.18.0-alpine AS deps
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY packages/shared/package.json /usr/src/app/packages/shared/package.json

COPY packages/api/package.json /usr/src/app/packages/api/package.json

RUN yarn install --pure-lockfile --frozen-lockfile --non-interactive --production

FROM node:12.18.0-alpine AS artefact
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules /usr/src/app/node_modules

COPY packages/shared/package.json /usr/src/app/packages/shared/package.json
COPY --from=build /usr/src/app/packages/shared/dist /usr/src/app/packages/shared/dist

COPY packages/api/package.json /usr/src/app/packages/api/package.json
COPY --from=build /usr/src/app/packages/api/dist /usr/src/app/packages/api/dist

COPY packages/api/CHECKS /usr/src/app/packages/api/CHECKS

ENV PORT=80
ENV NODE_ENV=production

# Uncomment this ENVs if you would like to run this container on local
# ENV DATABASE_URL "postgres://root:root@host.docker.internal/taurus"
# ENV SESSION_SECRET ""
# ENV GITHUB_CLIENT_SECRET ""

WORKDIR /usr/src/app/packages/api

EXPOSE 80
CMD ["yarn", "start:prod"]
