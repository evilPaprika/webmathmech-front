import { ArgsType, Field } from 'type-graphql';
import { IsAlphanumeric, Length } from 'class-validator';
import { Role } from '../../models/Role';


@ArgsType()
export class PatchCurrentUserInput {
    @Field({ nullable: true })
    @Length(2, 40)
    public name?: string;

    @Field({ nullable: true })
    @Length(2, 40)
    public surname?: string;

    @Field({ nullable: true })
    @Length(8, 64)
    @IsAlphanumeric()
    public password?: string;
}

@ArgsType()
export class PatchUserInput {
    @Field()
    public id!: string;

    @Field({ nullable: true })
    @Length(2, 40)
    public name?: string;

    @Field({ nullable: true })
    @Length(2, 40)
    public surname?: string;

    @Field(() => Role, { nullable: true })
    public role?: Role;
}
