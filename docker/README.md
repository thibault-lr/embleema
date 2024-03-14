# Docker 

## Architecture

- MongoDB
- Keycloak
- Api (Node)
- Webapp (Nginx)


## Set up 
Copy the `.env.template` file into a `.env` file and fill in the variables. You can use the following example:

```
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=root
MONGO_APP_DB=embleema_db
MONGO_APP_USER=embleema_user
MONGO_APP_PASSWORD=embleema_password

KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=admin
```

## Start the Containers

To start the containers, execute the command:
```bash
docker-compose up 
```

This will start multiple containers:
- [MongoDB](https://www.mongodb.com/) Replica Set: Mongo1, Mongo2, Mongo3
  The current docker-compose will set up a MongoDB cluster with replica. This is necessary to work with [Prisma ORM](https://github.com/prisma/prisma/issues/8266).


- [Keycloak](https://www.keycloak.org/) IAM authenticator

## Setup

### Keycloak

The `keycloak` folder contains a file `realm.json` that automatically sets up a default configuration: it creates a realm (`embleema-iam`), a client (`embleema-webapp`), and 2 users: `user` and `admin`.

If you want other values, you need to update them directly inside the `realm.json` file. Be careful when editing the clients; the variables `redirectUris` must strictly match the HTTP server of the webapp as it's used for login redirection.


#### SSL
You need to generate certificates to set up the SSL : 
```
cd keycloak;
openssl req -newkey rsa:2048 -nodes \  -keyout server.key.pem -x509 -days 3650 -out server.crt.pem
```

#### Testing

You can access `http://localhost:8080/` and you will be able to login using the values of environment variables KEYCLOAK_ADMIN and KEYCLOAK_ADMIN_PASSWORD.

### MongoDB

The access to the MongoDB database will be made through an authentication table and will have be user scoped.


#### Testing the connection

Based on the example above with the variables, the query string to connect to the database should be : 
`mongodb://embleema_user:embleema_password@localhost:27017/embleema_db?directConnection=true&authSource=embleema_db`



