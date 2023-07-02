FROM artifactory.asredanesh.com/docker/node:current-buster-slim
RUN apt update \
    && apt install net-tools

# Install node packages
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy application source
WORKDIR /usr/src
COPY . ./app
COPY .env_development ./app/.env
WORKDIR /usr/src/app

# Build App
RUN npm run build

# Deploy
EXPOSE 3000
CMD [ "npm", "run", "start" ]
