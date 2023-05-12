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

# Install phpmyadmin
RUN apk add php81-common php81-session php81-iconv php81-json php81-gd php81-curl php81-xml php81-mysqli php81-imap php81-cgi fcgi php81-pdo php81-pdo_mysql php81-soap php81-posix php81-gettext php81-ldap php81-ctype php81-dom php81-simplexml
RUN mkdir -p /etc/nginx/snippets
COPY config/nginx/snippet.conf /etc/nginx/snippets/phpmyadmin.conf
RUN mkdir -p /srv \
	&& wget -q 'https://files.directadmin.com/services/all/phpMyAdmin/phpMyAdmin-5.2.1-all-languages.tar.gz' \
	&& tar xf phpMyAdmin-5.2.1-all-languages.tar.gz \
	&& rm phpMyAdmin-5.2.1-all-languages.tar.gz \
	&& mv phpMyAdmin-5.2.1-all-languages /srv/phpmyadmin \
	&& chmod -R 777 /srv/phpmyadmin

EXPOSE 80 3306

CMD ["startup"]
