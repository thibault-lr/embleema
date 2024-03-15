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

You now need to set up the [API](./packages/api/README.md#Configuration) and the [WebAPP](./packages/webapp/README.md#setup) environment variables. Then start the containers : 




Once the dev containers are started, you can run the command at the project root : 
```shell
yarn dev
```

This will start both the [API](./packages/api/README.md) and the [WebAPP](./packages/webapp/README.md).

You can test that both services are up :
```
http://localhost:3000/ (api)
http://localhost:5173/ (webapp)

```



### Run production environment

#### Update the /etc/host file
This aims to redirect the routes https://keycloak to https://localhost

```bash
sudo nano /etc/hosts
```

and add an entry : 
```
127.0.0.1 keycloak
```



This aims to run all the containers under a secured connection (TLS). You first need to update the new variables, first go to both the [API](./packages/api/README.md) and the [WebAPP](./packages/webapp/README.md) to setup the SSL part documentation (espacially the certificates at the correct location).

Build the application : 
```shell
yarn build
```


```shell
docker-compose -f docker/docker-compose.prod.yml up 
```

This will start all the containers using HTTPS.

However there are some issues, the token validation (API -> Keycloak) returns a 401  despite the Allowed Origin (*) set up on Keycloak. That's why it is disabled in production.




Deployed environments :
- https://localhost:443 (webapp)
- https://localhost:3000 (api)
- https://localhost:3000/doc (api doc)
- https://localhost:8443 (keycloak admin)



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