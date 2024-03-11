# Docker 

## Architecture
The current docker-compose will set up a MongoDB cluster with replica. This is necessary to work with (https://github.com/prisma/prisma/issues/8266)[Prisma ORM]. 

## Set up 
Copy the .env.template


## Start the containers

To start the containers, execute the command : 
```bash
docker-compose up 
```

This will start the 3 database nodes and set up a replicat set. The creation of the replicat set will be executed by the container `mongo-setup`

## Scripts


### Create the database  and the role

```bash
docker-compose exec mongod1 mongosh -u <MONGO_INITDB_ROOT_USERNAME> -p <MONGO_INITDB_ROOT_PASSWORD>
```

```
  use embleema_db;
  db.createUser({
      user: "myUser",
      pwd: "myPassword",
      roles: [
          { role: "readWrite", db: "embleema_db" }
      ]
  });
```