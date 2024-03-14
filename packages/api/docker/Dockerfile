FROM node:20 as builder

WORKDIR /tmp/app
RUN yarn global add turbo

COPY ../../ .


RUN yarn workspaces focus api

# Build other repos and dependencies
RUN yarn workspaces foreach -tR --from api run prebuild   
RUN yarn workspaces foreach -tR --from api run build   

RUN yarn workspaces focus api --production

RUN yarn 

RUN yarn build

## SSL (should be in docker file context)
COPY ./packages/api/docker/localhost.crt ./packages/api/dist/src/certs/localhost.crt
COPY ./packages/api/docker/localhost.key ./packages/api/dist/src/certs/localhost.key





CMD ["node", "./packages/api/dist/src/main.js"]
