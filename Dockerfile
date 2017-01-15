FROM alpine:latest

EXPOSE 5000

# set default path
WORKDIR /infinitely

# copy yardly source code to container
COPY ./dist /infinitely/
COPY ./package.json /infinitely/

# install deps and build dist
RUN set -x \
    && apk --no-cache add nodejs \
    && npm install

# set node env to production after build
ENV NODE_ENV production

ENTRYPOINT ["node", "/infinitely/server.js"]
