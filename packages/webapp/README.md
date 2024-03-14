# Embleema Webapp

Embleema webapp is a React SPA that uses Keycloak as authentication

## Setup

Inside the webapp folder, copy the values from `.env.template` to `.env` file. Refer to the docker setup to get the correct values.

If you want a ready to use configuration, you can use this :

```
VITE_KEYCLOAK_AUTH_URL=http://localhost:8080/realms/embleema-iam
VITE_KEYCLOAK_AUTH_REDIRECT_URL=http://localhost:5173/
VITE_KEYCOAK_CLIENT_ID=embleema-webapp
VITE_EMBLEEMA_API_URL=http://localhost:3000
```

## SSL

As the webapp will be exectued with TLS inside an Nginx container. To do that, we need to first create the certificates
:

Create a local certificate using `openssl`.

```
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
  -keyout nginx/localhost.key -out nginx/localhost.crt \
  -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost"

```

This will generates two certificates : nginx/localhost.crt nginx/localhost.key

That will be copied inside the container.

### Update configuration variables (Todo)

If you want a ready to use configuration, you can use this :

```
VITE_KEYCLOAK_AUTH_URL=https://localhost:8080/realms/embleema-iam
VITE_KEYCLOAK_AUTH_REDIRECT_URL=https://localhost:443/
VITE_KEYCOAK_CLIENT_ID=embleema-webapp
VITE_EMBLEEMA_API_URL=https://localhost:3000
```
