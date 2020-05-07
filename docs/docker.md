Запустить вручную latest из докерхаба:
```
 docker run -d --env-file=docker_environment_front -p 80:3001  --rm webmathmech/front
``` 

Запуск хранилища minio:   
```
docker run --network="host" --env-file=docker_environment_front -d -p 45000:9000 -v /mnt/data:/data minio/minio server /data
```