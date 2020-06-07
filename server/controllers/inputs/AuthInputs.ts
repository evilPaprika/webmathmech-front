import { IsAlphanumeric, Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';


@ArgsType()
export class SignInInput {
    @Field()
    @Length(4, 32, {
        message: 'Логин должен быть длиной от 4 до 32 символов!'
    })
    @IsAlphanumeric()
    public login!: string;

    @Field()
    @Length(8, 64, {
        message: 'Пароль должен быть длиной от 8 до 64 символов!'
    })
    @IsAlphanumeric()
    public password!: string;
}

@ArgsType()
export class SignUpInput {
    @Field()
    @Length(2, 40, {
        message: 'Имя должно быть длиной от 2 до 40 символов!'
    })
    public name!: string;

    @Field()
    @Length(2, 40, {
        message: 'Фамилия должна быть длиной от 2 до 40 символов!'
    })
    public surname!: string;

    @Field()
    @Length(4, 32, {
        message: 'Логин должен быть длиной от 4 до 32 символов!'
    })
    @IsAlphanumeric()
    public login!: string;

    @Field()
    @Length(8, 64, {
        message: 'Пароль должен быть длиной от 8 до 64 символов!'
    })
    @IsAlphanumeric()
    public password!: string;
}
