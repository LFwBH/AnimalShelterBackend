FROM node:15-alpine AS build

ENV NODE_ENV production

WORKDIR /home/node

COPY package.json /home/node/
COPY yarn.lock /home/node/
COPY .yarn/ /home/node/.yarn/
COPY .yarnrc.yml /home/node/
COPY prisma/ /home/node/prisma/
COPY nest-cli.json /home/node/

RUN apk add --no-cache --virtual .gyp \
  python3 \
  make \
  g++ \
  && yarn install --immutable \
  && apk del .gyp

COPY src/ /home/node/src/
COPY scripts/ /home/node/scripts/
COPY tsconfig.build.json /home/node/
COPY tsconfig.json /home/node/

RUN yarn build && yarn workspaces focus --production

# ------------------------------

FROM node:15-alpine

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=build /home/node/package.json /home/node/
COPY --from=build /home/node/node_modules/ /home/node/node_modules/

COPY --from=build /home/node/dist/ /home/node/dist/

COPY --from=build /home/node/prisma/ /home/node/prisma/
COPY --from=build /home/node/scripts/ /home/node/scripts/

USER node
EXPOSE 3000

CMD ["node", "dist/main"]
