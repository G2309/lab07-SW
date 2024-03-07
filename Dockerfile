# Utilizar la imagen de mysql para crear una base de datos

FROM mysql:latest

# Variables iniciales

ENV MYSQL_ROOT_PASSWORD=toor
ENV MYSQL_DATABASE=postdb
ENV MYSQL_USER=gustavo
ENV MYSQL_PASSWORD=gus

# Copiar config, de schema para crear las tablas

COPY schema.sql /docker-entrypoint-initdb.d/
