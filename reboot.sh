#!/bin/sh


docker build -t front_monitoramento .

docker rm -f front || 1

docker run -d -p 8080:80 --name front front_monitoramento

