#!/bin/sh
thisdir=$(realpath "$0" | xargs -I {} dirname "{}")

for container in mariadb wheeladvisor
do
	cd "$thisdir"/$container
	docker build -t $container . 
done

cd "$thidir"
docker compose up -d
