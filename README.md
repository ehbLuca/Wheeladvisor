# Programming Project - WheelAdvisor

### Setup with docker
First install [docker](https://docs.docker.com/engine/install/),
checkout the [getting started](https://docs.docker.com/get-started/) page for more info.
We will setup a docker container containing [mariadb](https://mariadb.org/), [nginx](https://www.nginx.com/) and the express js webapp.

#### Building
Build an image 'wheelie'
```bash
cd docker
docker build -t wheelie .
```
#### Running
Bring a docker container 'wheelie1' up, based on the previously built image.
> docker-compose.yml
```yaml
version: '3'
services:
  wheelie1:
    image: wheelie
    ports: 
      - 4032:80 # nginx
      - 4033:3306 # mariadb
    container_name: wheelie1
    volumes:
      - ../node:/app
      - ../website:/app/website
```
```bash
cd docker
docker compose up -d
```
#### Stopping
```bash
docker stop wheelie1
```
