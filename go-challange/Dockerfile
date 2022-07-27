FROM golang:latest as builder

WORKDIR /var/www/app

COPY ./main.go /var/www/app

RUN go mod init hello-world.com

FROM golang:alpine3.15

WORKDIR /var/www/app

COPY --from=builder /var/www/app /var/www/app

ENTRYPOINT [ "go", "run", "main.go" ]