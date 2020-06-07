import { IsAlphanumeric, Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

import { Role } from '../../models/EnumModels';
import User from '../../models/User.sequelize';


@ArgsType()
export class PatchCurrentUserInput implements Partial<User> {
    @Field({ nullable: true })
    @Length(2, 40, {
        message: 'Имя должно быть длиной от 2 до 40 символов!'
    })
    public name?: string;

    @Field({ nullable: true })
    @Length(2, 40, {
        message: 'Фамилия должна быть длиной от 2 до 40 символов!'
    })
    public surname?: string;

    @Field({ nullable: true })
    @Length(8, 64, {
        message: 'Пароль должен быть длиной от 8 до 64 символов!'
    })
    @IsAlphanumeric()
    public password?: string;

    @Field({ nullable: true })
    @Length(2, 10, {
        message: 'Название группы должно быть длиной от 2 до 10 символов!'
    })
    public universityGroup?: string;
}

@ArgsType()
export class PatchUserInput implements Partial<User> {
    @Field()
    public id!: string;

    @Field({ nullable: true })
    @Length(2, 40, {
        message: 'Имя должно быть длиной от 2 до 40 символов!'
    })
    public name?: string;

    @Field({ nullable: true })
    @Length(2, 40, {
        message: 'Фамилия должна быть длиной от 2 до 40 символов!'
    })
    public surname?: string;

    @Field(() => Role, { nullable: true })
    public role?: Role;

    @Field({ nullable: true })
    @Length(2, 10, {
        message: 'Название группы должно быть длиной от 2 до 10 символов!'
    })
    public universityGroup?: string;
}
