#!/bin/sh
thisdir=$(realpath "$0" | xargs -I {} dirname "{}")


for container in mariadb wheeladvisor
do
	cd "$thisdir"/$container
	docker build -t $container . 
	docker compose up -d
done
