# Docker Challenges

For all challenges to work, you need to have [Docker](https://www.docker.com/) installed on your machine.

## **[Golang](https://go.dev/) Challenge**
This challenge consists of a container that runs the message bellow:

`Code.education Rocks!`

non-functional requirements:
- The image could not be larger than 2MB.

## How To Run

The image is already on DockerHub, so you just need to run:

```
docker run --rm brenoxavier485/codeeducation
```

But, if you want to build and run localy, follow the steps bellow

```
> cd go-challenge
> docker build -t <desired-image-name> .
> docker run --rm <desired-image-name>
```


