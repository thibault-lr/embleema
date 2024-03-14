# API

## Table of contents

- [Getting started](#getting-started)
  - [Configuration](#configuration)
  - [Start the API](#start-the-partner-api)
- [Building](#building)

## Getting started

### Configuration

Create a `.env`, copying the [.env.example](.env.example) file (it contains all the keys of `.env`).

If you want a ready to use configuration, you can use this :

```
DATABASE_URL="mongodb://embleema_user:embleema_password@localhost:27017/embleema_db?directConnection=true&authSource=embleema_db"
PRISMA_FIELD_ENCRYPTION_KEY=k1.aesgcm256.PEkTo4C0zBhswRughc_dh10mX-58kCnuR25AEL1KrQY=

KEYCLOAK_AUTH_SERVER_URL=http://localhost:8080
KEYCLOAK_CLIENT_ID=embleema-api
KEYCLOAK_REALM=embleema-iam
KEYCLOAK_CLIENT_SECRET=GbM9bBMW9W7LYLyndNQobrBNWVDvDX6C

```

#### Keycloak

As embleema-api user is not a public client, a secret needs to be provided. There is already one by default in the
realm.json. This is not production ready.

#### Prisma

All the fields inserted to the database are encrypted, thus an encryption Key is needed.

### Start the API in development mode

```shell
yarn dev
```

## Building

Build the application:

```shell
yarn build
```

## Deployment with SSL

As the API will be exectued with TLS inside an Nginx container. To do that, we need to first create the certificates :

Create a local certificate using `openssl`.

```
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
  -keyout docker/localhost.key -out docker/localhost.crt \
  -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost"

```

This will generates two certificates : docker/localhost.crt docker/localhost.key

That will be copied inside the container.
