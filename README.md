# mobile-bank
## Details Project
Panel Client Web For mobile-bank
And code base on Nuxt.js And Vue.js

Before build project please install
- Nodejs
- NPM

### Build Setup

```bash

# -----------------------------
# install dependencies
# -----------------------------
$ cp .env_localhost .env
$ npm install

# -----------------------------
# develop local
# serve with hot reload at localhost:8003
# -----------------------------
$ npm run dev

# -----------------------------
# production
# build for production and launch server
# -----------------------------
$ npm run build
$ npm run start

# -----------------------------
# static
# generate static project
# -----------------------------
$ npm run generate

# -----------------------------
# .env_custom
# run dev by custom env
# -----------------------------
$ nuxt --dotenv .env_development
$ nuxt --dotenv .env_preproduct
$ nuxt --dotenv .env_product

$ ./node_modules/nuxt/bin/nuxt.js --dotenv .env_development 
$ ./node_modules/nuxt/bin/nuxt.js --dotenv .env_preproduct 
$ ./node_modules/nuxt/bin/nuxt.js --dotenv .env_product 

```
