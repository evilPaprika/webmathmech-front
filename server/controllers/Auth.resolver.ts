import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import {
    Args,
    Mutation,
    Resolver,
} from 'type-graphql';
import config from 'config';

import User from '../models/User.sequelize';
import Token from '../models/Token';
import { IUserPayLoad } from '../types/jwt';
import { SALT } from '../consts';
import { Role } from '../models/Role';
import { SignInInput, SignUpInput } from './inputs/AuthInputs';


const JWT_TOKEN_EXPIRATION_TIME = '1y';


@Resolver()
export default class AuthResolver {
    @Mutation(() => Token)
    public async userSignIn(@Args() { login, password, }: SignInInput) {
        const user = await User.findOne({ where: { login: login.toLowerCase() } });

        if (!user) {
            throw new Error('No user with that login');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Incorrect password');
        }
        const payload: IUserPayLoad = { id: user.id };
        // Generate a new token a save it
        const token = jsonwebtoken.sign(payload, config.JWTSecret, { expiresIn: JWT_TOKEN_EXPIRATION_TIME });

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
        const payload: IUserPayLoad = { id: newUser.id };
        const token = jsonwebtoken.sign(payload, config.JWTSecret, { expiresIn: JWT_TOKEN_EXPIRATION_TIME });

        return { token };
    }
}
