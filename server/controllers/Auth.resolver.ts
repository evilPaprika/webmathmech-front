import bcrypt from 'bcrypt';
import {
    Args,
    Mutation,
    Resolver
} from 'type-graphql';

import User from '../models/User.sequelize';
import Token from '../models/Token';
import { SALT } from '../consts';
import { Role } from '../models/EnumModels';
import { SignInInput, SignUpInput } from './inputs/AuthInputs';
import { createJWTToken } from '../utils';

@Resolver()
export default class AuthResolver {
    @Mutation(() => Token)
    public async userSignIn(@Args() { login, password, }: SignInInput) {
        const user = await User.findOne({ where: { login: login.toLowerCase() } });

        if (!user) {
            throw new Error('No user with that login');
        }

        const valid = await bcrypt.compare(password, user.password!);
        if (!valid) {
            throw new Error('Incorrect password');
        }
        const token = createJWTToken({ id: user.id });

        return { token };
    }

    @Mutation(() => Token)
    public async userSignUp(@Args() { name, surname, login, password }: SignUpInput) {
        const user = await User.findOne({ where: { login } });

        if (user) {
            throw new Error('Login already exists');
        }

        const hashedPassword = await bcrypt.hash(password, SALT);

        const newUser = await User.create({
            name,
            surname,
            login: login.toLowerCase(),
            password: hashedPassword,
            role: Role.USER
        });

        const token = createJWTToken({ id: newUser.id });

        return { token };
    }
}
