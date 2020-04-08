import config from 'config';
import { Client } from 'minio';


export const minioClient = new Client({ ...config.minio });
