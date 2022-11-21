<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Basic User CRUD and signin/signup. Developed with NestJS. implementing TypeORM with postgreSQL and CQRS

## Installation

```bash
$ npm install
```

## Running the app

create an .env file and complete the required variables before running this commands. Also make sure you have postgreSQL installed or run

```bash
docker-compose --env-file .env up
```

to create a container where postgreSQL and pgadmin instances are created.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docs

after running the app you can open http://localhost:{PORT}/docs to see swagger docs for every endpoint

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Matias Delorenzi](https://www.linkedin.com/in/matias-delorenzi/)
- GitHub - [MatiasDelorenzi](https://github.com/MatiasDelorenzi)
