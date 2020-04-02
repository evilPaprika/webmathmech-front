import { ArgsType, Field } from 'type-graphql';
import { IsAlphanumeric, Length } from 'class-validator';

@ArgsType()
export class VkSignInput {
    @Field()
    @Length(4, 128)
    @IsAlphanumeric()
    public code!: string;
}
