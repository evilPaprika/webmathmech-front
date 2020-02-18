import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import {
    Args,
    Mutation,
    Resolver,
} from 'type-graphql';
import config from 'config';
import User from '../models/User.sequelize';
import AuthInputArgs from '../models/AuthInputArgs';
import Token from '../models/Token';
import { IUserPayLoad } from '../types/jwt';
import { Role } from '../types';
import { SALT } from '../consts';

const expiresIn = '1y';

@Resolver()
export default class AuthResolver {
    @Mutation(() => Token)
    public async userSignIn(@Args()
        {
            login,
            password,
        }: AuthInputArgs) {
        // Check if the user is in database
        const user = await User.findOne({ where: { login } });

        if (!user) {
            throw new Error('No user with that login');
        }

        // Check if the password is valid
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Incorrect password');
        }
        const payload: IUserPayLoad = {
            id: user.id,
            role: Role.USER,
        };
        // Generate a new token a save it
        const token = jsonwebtoken.sign(payload, config.secret, {
            expiresIn,
        });

        return { token };
    }

    @Mutation(() => Token)
    public async userSignUp(
    @Args()
        { login, password }: AuthInputArgs
    ) {
        // Find if there is an existing account
        const user = await User.findOne({ where: { login } });

        if (user) {
            throw new Error('Login already exists');
        }

        const hashedPassword = await bcrypt.hash(password, SALT);

        const newUser = await User.create({
            login,
            password: hashedPassword,
        });
        const payload: IUserPayLoad = {
            id: newUser.id,
            role: Role.USER,
        };
        const token = jsonwebtoken.sign(payload, config.secret, {
            expiresIn,
        });

        return { token };
    }
}
