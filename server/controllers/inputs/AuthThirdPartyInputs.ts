import { IsAlphanumeric, Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class VkSignInput {
    @Field()
    @Length(4, 128)
    @IsAlphanumeric()
    public code!: string;
}
