import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload } from 'apollo-server-koa';
import { ReadStream } from 'fs';
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
        await new Promise((resolve) => {
            minioClient.putObject('main', filename, createReadStream(), (error: Error | null) => {
                if (error) throw new Error(error.message);
                resolve();
            });
        });

        return `/media/${filename}`;
    }
}
