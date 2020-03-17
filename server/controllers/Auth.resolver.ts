import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import {
    Args,
    ArgsType,
    Field,
    Mutation,
    Resolver,
} from 'type-graphql';
import config from 'config';
import { Length } from 'class-validator';
import User from '../models/User.sequelize';
import Token from '../models/Token';
import { IUserPayLoad } from '../types/jwt';
import { Role } from '../types';
import { SALT } from '../consts';


const JWT_TOKEN_EXPIRATION_TIME = '1y';


@ArgsType()
class AuthInput {
    @Field()
    @Length(4, 16, { message: 'Login should be between 4 and 16 characters' })
    public login!: string;

    @Field()
    @Length(8, 64, { message: 'Password is too short' })
    public password!: string;
}


@Resolver()
export default class AuthResolver {
    @Mutation(() => Token)
    public async userSignIn(@Args() { login, password, }: AuthInput) {
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
        const token = jsonwebtoken.sign(payload, config.JWTSecret, { expiresIn: JWT_TOKEN_EXPIRATION_TIME });

        return { token };
    }

    @Mutation(() => Token)
    public async userSignUp(@Args() { login, password }: AuthInput) {
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
        const token = jsonwebtoken.sign(payload, config.JWTSecret, { expiresIn: JWT_TOKEN_EXPIRATION_TIME });

        return { token };
    }
}
