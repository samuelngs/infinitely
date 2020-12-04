FROM alpine:latest

EXPOSE 5000

# set default path
WORKDIR /infinitely

# copy source code to container
COPY ./package.json /infinitely/

# install deps and build dist
RUN set -x \
    && apk --no-cache add nodejs yarn \
    && yarn

RUN yarn build

# set node env to production after build
ENV NODE_ENV production

ENTRYPOINT ["node", "/infinitely/dist/server.js"]
