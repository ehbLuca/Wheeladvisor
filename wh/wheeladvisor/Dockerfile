FROM alpine:latest

# Dependencies
RUN apk update
RUN apk add npm

COPY config/startup.sh /usr/local/bin/startup
RUN chmod +x /usr/local/bin/startup

EXPOSE 80

WORKDIR /app

CMD ["startup"]
