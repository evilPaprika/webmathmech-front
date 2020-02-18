import { Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class RecipeInput {
    @Field()
    @Length(4, 16)
    public login!: string;

    @Field()
    @Length(8, 255)
    public password!: string;
}
