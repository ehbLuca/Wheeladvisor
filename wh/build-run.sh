#!/bin/sh

thisdir=$(realpath "$0" | xargs -I {} dirname "{}")

for container in mariadb wheeladvisor
do
	cd "$thisdir"/$container
	docker build -t $container . 
done
printf 'Done.\n\n'

cd "$thisdir"

docker compose up -d
>&2 printf 'Done.\n\n'

>&2 printf 'Setting up the database from backup..\n'
docker container exec -i wh-mariadb-1 mariadb < ./all_databases.sql
