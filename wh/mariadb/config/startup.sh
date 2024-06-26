#!/bin/sh

# start mariadbd in background
mariadb-server &

# Wait for the server to be ready
while ! mysqladmin ping >/dev/null 2>&1
do
    sleep 1
done

mariadb < /tmp/setup.sql
shred -uz /tmp/setup.sql

# This will keep the container running
tail -f /dev/null
