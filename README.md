# SOLID NestJS

> Built with [NestJS](https://nestjs.com/)!

[![Lint, build and test](https://github.com/bulicmatko/solid-nestjs/actions/workflows/lint-build-and-test.yml/badge.svg?branch=main)](https://github.com/bulicmatko/solid-nestjs/actions/workflows/lint-build-and-test.yml)
[![CodeQL](https://github.com/bulicmatko/solid-nestjs/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/bulicmatko/solid-nestjs/actions/workflows/codeql-analysis.yml)

## 📜 Scripts

```bash
# install dependencies
$ npm install

# run in development mode
$ npm run dev

# run in debug mode
$ npm run debug

# build from source
$ npm run build

# run in production mode
$ npm run start

# run unit tests
$ npm run test

# run unit tests with coverage
$ npm run test:cov

# run unit tests in watch mode
$ npm run test:watch

# run unit tests in debug mode
$ npm run test:debug

# run end-to-end tests
$ npm run test:e2e

# format prisma schema file
$ npm run prisma:format

# generate prisma client
$ npm run prisma:generate

# run migrations in development mode
$ npm run prisma:migrate:dev

# introspect database and update prisma schema
$ npm run prisma:db:pull

# migrate the database
$ npm run prisma:db:push

# start prisma studio
$ npm run prisma:studio

# run eslint check
$ npm run lint:check

# run eslint fix
$ npm run lint:fix
```

## 🏞 Environment Variables

```bash
# Logger Module
LOG_LEVELS=

# Auth Module
JWT_SECRET=

# Prisma Module
DATABASE_URL=
DATABASE_LOG_LEVELS=

# Redis Module
REDIS_HOST=
REDIS_PORT=
REDIS_USER=
REDIS_PASS=

# Mailer Module
SMTP_EMAIL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```
