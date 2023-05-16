# Programming Project - WheelAdvisor

### Setup with docker
First install [docker](https://docs.docker.com/engine/install/),
checkout the [getting started](https://docs.docker.com/get-started/) page for more info.
We will setup a docker container containing [mariadb](https://mariadb.org/), [nginx](https://www.nginx.com/) and the [express js](http://expressjs.com/) webapp.

#### Setting up
git clone the project and navigate to your newly created directory.
```bash
git clone https://github.com/EHB-TI/programming-project-groep-1-wheeladvisor.git wheeladvisor
cd wheeladvisor
```
Ensure docker is running or start it with
`systemctl start docker.service`

### Installation
To install and run, use this script.
```bash
sudo ./build-run.sh
```
This script will create the docker image and container for the project.
Afterwards it will try to bring the container up.

If the script succeeds a link should appear in the console, and you're good to go!

#### Stopping
```bash
sudo docker stop wheelie1
```
 It can be brought back with
`sudo docker start wheelie1`
