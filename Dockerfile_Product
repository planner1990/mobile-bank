FROM artifactory.asredanesh.com/docker/node:current-buster-slim2
RUN apt update \
    && apt install net-tools
# Install node packages
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
# Copy application source
WORKDIR /usr/src
COPY . ./app
COPY .env_product ./app/.env
WORKDIR /usr/src/app
# Build App
RUN npm run build
##### Deploy
CMD [ "npm", "run", "start" ]
###
