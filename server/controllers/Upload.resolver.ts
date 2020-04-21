import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload } from 'apollo-server-koa';
import { ReadStream } from 'fs';
import sharp from 'sharp';
import { streamToBuffer } from '@jorgeferrero/stream-to-buffer';
import path from 'path';

import { minioClient } from '../minio';


export interface Upload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream(): ReadStream;
}

@Resolver()
export class UploadResolver {
    @Mutation(() => String)
    public async fileUpload(@Arg('file', () => GraphQLUpload!) { createReadStream, filename }: Upload) {
        const { name, ext } = path.parse(filename);

        let fileData: Buffer | ReadStream = createReadStream();
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
            const buffer = await streamToBuffer(fileData);
            fileData = await sharp(buffer)
                .jpeg({ quality: 80 })
                .toBuffer();

            filename = `${name}.jpg`;
        }

        await new Promise((resolve) => {
            minioClient.putObject('main', filename, fileData, (error: Error | null) => {
                if (error) {
                    throw new Error(error.message);
                }
                resolve();
            });
        });

        return `/media/${filename}`;
    }
}
