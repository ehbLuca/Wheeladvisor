# Programming Project - WheelAdvisor

### Setup with docker
First install [docker](https://docs.docker.com/engine/install/),
checkout the [getting started](https://docs.docker.com/get-started/) page for more info.
We will setup a docker container containing [mariadb](https://mariadb.org/), [nginx](https://www.nginx.com/) and the express js webapp.

#### Installation
The install script will build an image 'wheelie'
and run a container wheelie1.
```bash
git clone https://github.com/EHB-TI/programming-project-groep-1-wheeladvisor.git wheeladvisor
cd wheeladvisor
systemctl start docker.service # ensure docker is running
sudo ./build-run.sh # buils and brings the container up
```

#### Stopping
```bash
sudo docker stop wheelie1
```
