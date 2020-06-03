import { streamToBuffer } from '@jorgeferrero/stream-to-buffer';
import { GraphQLUpload } from 'apollo-server-koa';
import { ReadStream } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Arg, Mutation, Resolver } from 'type-graphql';

import { minioClient } from '../minio';


const FILE_EXTENSIONS_TO_MINIFY = ['.png', '.jpg', '.jpeg'];

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
        if (FILE_EXTENSIONS_TO_MINIFY.includes(ext)) {
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
