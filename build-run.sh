#!/bin/sh
cd docker
docker build -t wheelie . 
if docker compose up -d
then
	sleep 2 # let nginx start
	echo "app running on"
	echo "http://localhost:4032"
fi
