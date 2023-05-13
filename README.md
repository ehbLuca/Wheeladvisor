# Programming Project - WheelAdvisor

### Setup with docker
First install [docker](https://docs.docker.com/engine/install/),
checkout the [getting started](https://docs.docker.com/get-started/) page for more info.
> Build docker image
```bash
cd docker
docker build -t wheelie .
```
#### Running
> Bring a docker container 'wheelie1' up based on the previously built image
```bash
cd docker
docker compose up -d
```
#### Stopping
```bash
docker stop wheelie1
```
