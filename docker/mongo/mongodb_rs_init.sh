#!/bin/bash

m1=mongod1
m2=mongod2
m3=mongod3
port=${PORT:-27017}

echo "###### Waiting for ${m1} instance startup.."
until mongosh --host ${m1}:${port} --eval 'quit(db.runCommand({ ping: 1 }).ok ? 0 : 2)' &>/dev/null; do
  printf '.'
  sleep 1
done
echo "###### Working ${m1} instance found, initiating user setup & initializing rs setup.."

# setup user + pass and initialize replica sets
mongosh --host ${m1}:${port} <<EOF
const rootUser = '$MONGO_INITDB_ROOT_USERNAME';
const rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
const admin = db.getSiblingDB('admin');
admin.auth(rootUser, rootPassword);

const config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongod1:27017",
            "priority": 2
        },
        {
            "_id": 2,
            "host": "mongod2:27017",
            "priority": 1
        },
        {
            "_id": 3,
            "host": "mongod3:27017",
            "priority": 1,
            "arbiterOnly": true 
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF

echo "### Replicat set initialized"

# Setup Db + role
mongosh --host ${m1}:${port} <<EOF
const rootUser = '$MONGO_INITDB_ROOT_USERNAME';
const rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
  db = db.getSiblingDB('$MONGO_INITDB_APP_DB');
  db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');
  db.createUser({
      user: '$MONGO_INITDB_APP_USER',
      pwd: '$MONGO_INITDB_APP_PASSWORD',
      roles: [
          { role: "readWrite", db: "embleema_db" }
      ]
  });
EOF

echo "### Roles created on database"