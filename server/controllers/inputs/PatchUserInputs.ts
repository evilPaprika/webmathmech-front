import { IsAlphanumeric, Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

import { Role } from '../../models/EnumModels';
import User from '../../models/User.sequelize';


@ArgsType()
export class PatchCurrentUserInput implements Partial<User> {
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

    @Field({ nullable: true })
    @Length(2, 10)
    public universityGroup?: string;
}

@ArgsType()
export class PatchUserInput implements Partial<User> {
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

    @Field({ nullable: true })
    @Length(2, 10)
    public universityGroup?: string;
}
