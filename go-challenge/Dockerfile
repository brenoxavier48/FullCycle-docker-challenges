FROM golang:alpine3.15 as builder

WORKDIR /var/www/app

COPY ./main.go /var/www/app

RUN go mod init codeeducation.com
RUN go build -o build/codeeducation

FROM scratch

WORKDIR /var/www/app

COPY --from=builder /var/www/app/build/ /var/www/app

ENTRYPOINT [ "./codeeducation" ]