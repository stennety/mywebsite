---
published: true
title: Running MySQL in Docker with automatic restart
---
It's trivial to do all of the MySQL work you need to do via Docker. Simply run:

```
docker run -d -e 'MYSQL_ALLOW_EMPTY_PASSWORD=true' -e TZ='America/Los_Angeles' -p 3306:3306 --restart=always mysql:5.7.12 --sql-mode="ONLY_FULL_GROUP_BY"
```

Replacing "5.7.12" with your desired version of MySQL. This will start up this container every time the Docker daemon starts, and keep it running. By default, data is persisted. 

Note the `TZ` environment variable. Set this to your local timezone. Without this, the container will default to using UTC time, and sometimes you can run into issues when dealing with time in your code.

To stop the container from auto-restarting:

```
docker update --restart=no my-container
```
