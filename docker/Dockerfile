FROM alpine:latest

RUN apk update

# Install mariadb
RUN apk add mysql mysql-client \
	&& mysql_install_db --user=mysql --datadir=/var/lib/mariadb \
	&& mkdir -p /run/mysqld \
	&& chown mysql:mysql /run/mysqld

COPY config/startup.sh /usr/local/bin/startup
RUN chmod +x /usr/local/bin/startup

EXPOSE 3306

CMD ["startup"]
