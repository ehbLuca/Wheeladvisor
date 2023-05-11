#!/bin/sh

nginx

# This will keep the container running
/usr/bin/mariadbd \
	--basedir=/usr \
	--datadir=/var/lib/mariadb \
	--plugin-dir=/usr/lib/mariadb/plugin \
	--user=mysql \
	--skip-log-error \
	--pid-file=/run/mysqld/mysqld.pid \
	--socket=/run/mysqld/mysqld.sock
