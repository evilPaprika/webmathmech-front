Запустить вручную latest из докерхаба:
```
 docker run -d --env-file=docker_environment_front -p 80:3001  --rm webmathmech/front
``` 

Запустить вручную бранчу из докерхаба:
```
 docker pull webmathmech/front:${{ env.BRANCH }}
 docker run --env-file=docker_environment_front -p ${{ env.DEPLOY_PORT }}:3001 -d --rm webmathmech/front:${{ env.BRANCH }}
``` 
env.DEPLOY_PORT = 40000 + номер пр  

Запуск хранилища minio:   
```
 docker run --network="host" --env-file=docker_environment_front -d -p 45000:9000 -v /mnt/data:/data minio/minio server /data
```