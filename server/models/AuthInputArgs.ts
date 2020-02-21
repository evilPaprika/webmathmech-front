import { Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class RecipeInput {
    @Field()
    @Length(4, 16, { message: 'Login should be between 4 and 16 characters' })
    public login!: string;

    @Field()
    @Length(8, 64, { message: 'Password is too short' })
    public password!: string;
}
