---
layout: post
title: Wordpress Docker Compose
---

Starting with the official Quickstart, located at https://docs.docker.com/samples/wordpress/, we have a `docker-compose.yml` that looks like so:

```
services:
  db:
    image: mariadb:10.6.4-focal
    command: '--default-authentication-plugin=mysql_native_password'
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=somewordpress
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress
    expose:
      - 3306
      - 33060
  wordpress:
    image: wordpress:latest
    ports:
      - 80:80
    restart: always
    environment:
      - WORDPRESS_DB_HOST=db
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
      - WORDPRESS_DB_NAME=wordpress
volumes:
  db_data:
```

This is great, but we need access to plugins and themes. So let's copy the existing files from the `wordpress` container and mount them from a local directory in the root of our project.

First we need to find the container id. The value is in the first field, so just copy to your cipboard.
```
docker ps
```
```
CONTAINER ID   IMAGE                  COMMAND                  CREATED          STATUS          PORTS                               NAMES
610976a8de3c   wordpress:latest       "docker-entrypoint.s…"   37 minutes ago   Up 37 minutes   0.0.0.0:80->80/tcp, :::80->80/tcp   wordpress_wordpress_1
a59e5f9bc797   mariadb:10.6.4-focal   "docker-entrypoint.s…"   37 minutes ago   Up 37 minutes   3306/tcp, 33060/tcp                 wordpress_db_1
```

Now that we have the container id, we can begin copying files. The root of the project inside the container is located at `/var/www/html`, and we are interested in `wp-config.php`, `themes`, and `plugins`.

```
docker cp 610976a8de3c:/var/www/html/wp-config.php .
docker cp 610976a8de3c:/var/www/html/wp-content/plugins plugins
docker cp 610976a8de3c:/var/www/html/wp-content/themes themes
```

With local copies of the required files, we can mount them inside the container by modifying our `docker-compomse.yml`.

```
services:
  wordpress:
    image: wordpress:latest
    ports:
      - 80:80
    restart: always
    environment:
      - WORDPRESS_DB_HOST=db
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
      - WORDPRESS_DB_NAME=wordpress
    volumes:
      - ./wordpress/wp-config.php:/var/www/html/wp-config.php
      - ./wordpress/plugins:/var/www/html/wp-content/plugins
      - ./wordpress/themes:/var/www/html/wp-content/themes
```
