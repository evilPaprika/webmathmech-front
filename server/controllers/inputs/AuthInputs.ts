import { ArgsType, Field } from 'type-graphql';
import { IsAlphanumeric, Length } from 'class-validator';


@ArgsType()
export class SignInInput {
    @Field()
    @Length(4, 16)
    @IsAlphanumeric()
    public login!: string;

    @Field()
    @Length(8, 64)
    @IsAlphanumeric()
    public password!: string;
}

@ArgsType()
export class SignUpInput {
    @Field()
    @Length(2, 40)
    public name!: string;

    @Field()
    @Length(2, 40)
    public surname!: string;

    @Field()
    @Length(4, 32)
    @IsAlphanumeric()
    public login!: string;

    @Field()
    @Length(8, 64)
    public password!: string;
}
