# API

The API is based on NestJS. It uses Prisma as ORM. User authentication is managed with Keycloak.

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

The authentication management is handles by keycloak. The API uses his own client to valide the tokens sent to the front
end. The difference is that the API client contains a _secret_ key. You should change the SECRET in production and
retrieve it on the keycloak app (http://localhost:8080) using your master login.

To make things faster to set up, a secret is already set in the .env file.

#### Prisma and Encryption

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

## API doc

```shell
yarn dev
```

And access :

```
http://localhost:3000/doc
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
