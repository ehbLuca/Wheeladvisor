# WheelAdvisor
> Programming project Toegepaste Informatice 2022-2023

There are two ways of setting up this project:
1. [Setting up with docker on linux](https://github.com/EHB-TI/programming-project-groep-1-wheeladvisor/edit/readme/README.md#setup-with-docker-on-linux)
2. [Setting up with node](https://github.com/EHB-TI/programming-project-groep-1-wheeladvisor/edit/readme/README.md#setup-with-node)<br />
Setting up with node is easier, but you will have to setup a database server yourself and adjust the connection details in queries.js.
<br />
<br />

### Setup with docker on linux/WSL2
##### Prerequisites
First install [docker](https://docs.docker.com/engine/install/). We will setup a docker container that will run our webapp.

git clone the project and navigate to your newly created directory.
```bash
git clone https://github.com/EHB-TI/programming-project-groep-1-wheeladvisor.git wheeladvisor
cd wheeladvisor
```
##### Install and go
To install and run, use this script.
```bash
sudo ./build-run.sh
```
This script will create the docker image and container for the project.
Afterwards it will try to bring the container up.
If the script succeeds a link should appear in the console, and you're good to go!

##### Stopping
```bash
sudo docker stop wheelie1
```
 It can be brought back with
`sudo docker start wheelie1`
<br />
<br />
<br />
<br />
### Setup with node
> Hopefully OS agnostic
##### Prerequisites
Clone the project and navigate to your newly created directory.
```bash
git clone https://github.com/EHB-TI/programming-project-groep-1-wheeladvisor.git wheeladvisor
cd wheeladvisor
```
You will also need to create a website directory. Use a symbolic link.<br />
**Linux:**<br />
`ln -sf ../website website`<br />
**Bindows:**<br />
`mklink /D website ../website`

##### Installation
Navigate to node directory and install the dependencies.

```bash
cd node
npm install
```
If the command was succesful run:
```bash
npm run start
```
From here you should see an url in the console and the website should be running on [http://localhost:3000](http://localhost:3000)
##### Stopping
Simply close the terminal or hit Ctrl+C
