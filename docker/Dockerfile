FROM alpine:latest

RUN apk update

# Install nginx
RUN apk add nginx \
	&& adduser -D -g 'www' www \
	&& mkdir -p /www \
	&& chown -R www:www /var/lib/nginx \
	&& chown -R www:www /www
COPY config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/nginx/index.html /www/index.html

# Install mariadb
RUN apk add mysql mysql-client \
	&& mysql_install_db --user=mysql --datadir=/var/lib/mariadb \
	&& mkdir -p /run/mysqld \
	&& chown -R mysql:mysql /run/mysqld
COPY config/mariadb/setup.sql /tmp/setup.sql
COPY config/mariadb/mariadb-server.sh /usr/local/bin/mariadb-server
RUN chmod +x /usr/local/bin/mariadb-server

COPY config/startup.sh /usr/local/bin/startup
RUN chmod +x /usr/local/bin/startup

EXPOSE 80 3306

CMD ["startup"]
