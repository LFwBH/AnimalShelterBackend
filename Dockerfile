FROM node:15-alpine AS build

ENV NODE_ENV production

WORKDIR /home/node

COPY package.json /home/node/
COPY yarn.lock /home/node/
COPY .yarn/ /home/node/.yarn/
COPY .yarnrc.yml /home/node/
COPY prisma/ /home/node/prisma/
COPY nest-cli.json /home/node/

RUN yarn install --immutable

COPY src/ /home/node/src/
COPY tsconfig.build.json /home/node/
COPY tsconfig.json /home/node/

RUN yarn build

# ------------------------------

FROM node:15-alpine

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=build /home/node/package.json /home/node/
COPY --from=build /home/node/node_modules/ /home/node/node_modules/
COPY --from=build /home/node/dist/ /home/node/dist/

EXPOSE 3000

USER node

CMD ["node", "dist/main"]
