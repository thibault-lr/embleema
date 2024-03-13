# API

## Table of contents

- [Getting started](#getting-started)
  - [Configuration](#configuration)
  - [Start the API](#start-the-partner-api)
- [Building](#building)

## Getting started

### Configuration

Create a `.env`, copying the [.env.example](.env.example) file (it contains all the keys of `.env`).

#### Keycloak

As embleema-api user is not a public client, a secret needs to be provided. There is already one by default in the
realm.json. This is not production ready.

### Start the API in development mode

```shell
yarn dev
```

## Building

Build the application:

```shell
yarn build
```
