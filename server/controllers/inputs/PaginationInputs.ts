import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationInputs {
    @Field(() => Int)
    public limit: number = 10;

    @Field(() => Int)
    public offset!: number;
}
