#!/bin/sh
thisdir=$(realpath "$0" | xargs -I {} dirname "{}")

for container in mariadb wheeladvisor
do
	cd "$thisdir"/$container
	docker build -t $container . 
done

cd "$thidir"
docker compose up -d

docker cp ../../src/sql/tables.sql mariadb:/tmp/
docker exec -it mariadb sh -c '
mariadb < /tmp/tables.sql
shred -uz /tmp/tables.sql
'
