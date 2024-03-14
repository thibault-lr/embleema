# Embleema

Technical test for Embleema


## Getting started

### Prerequisites

- Node.js 20
- Yarn 4
- Docker

### Installation

Clone the project

```bash
git clone https://github.com/thibault-lr/embleema
```

Go to the project directory

```
cd embleema
```

Install dependencies

```shell
yarn install --immutable
```




### Run local environment

These instructions will set up a local environment with a ready-to-use application : 
- Set up keycloak with basic user
- Set up MongoDB user with authentication datbase

To set up docker, please visit [Docker README](./docker/README.md).


You now need to set up the [API](./packages/api/README.md) and the [WebAPP](./packages/webapp/README.md) environment variables

Once the containers are start, you can run the command : 
```shell
yarn dev
```

This will start both the [API](./packages/api/README.md) and the [WebAPP](./packages/webapp/README.md).

You can test that both services are up :
```
http://localhost:3000/ (api)
http://localhost:5173/ (webapp)

```



### Run production environment (Pending)

This aims to run all the containers under a secured connection (TLS). You first need to update the new variables, first go to both the [API](./packages/api/README.md) and the [WebAPP](./packages/webapp/README.md) to see the SSL part documentation.


```shell
docker-compose -f docker/docker-compose.prod.yml up 
```

This will start all the containers using HTTPS.

However there are some issues : The token issued by the keycloak client (embleema-webapp) contains a property ISS that has to `https://localhost:8443/realms/embleema-iam`. On the API side, there is another client that validates a token (embleema-api).

- Not able to validate the ISS because connecting to keycloak with "https://keycloak" would result to a different ISS comparaison : https://github.com/ferrerojosh/nest-keycloak-connect/issues/174
- Not able to validate a custom SSL certificate


### Run the tests

Note : you need a local mongodb Set

```bash
yarn test
```

This will execute all unit and e2e tests.

### Project structure

```tree
packages
├── api                      # API applications
├── eslint-config-embleema   # Shared ESLint config
├── embleema-domain          # Shared domain entities
├── webapp                   # Patient front application
``` 


### Tooling

- Eslint, Prettier, tsup, turbo repo