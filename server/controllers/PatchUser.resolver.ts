import {
    Args,
    Authorized,
    Ctx,
    Mutation,
    Resolver,
} from 'type-graphql';
import bcrypt from 'bcrypt';

import User from '../models/User.sequelize';
import { ApolloServerContext } from '../types';
import { Role } from '../models/EnumModels';
import { SALT } from '../consts';
import { PatchCurrentUserInput, PatchUserInput } from './inputs/PatchUserInputs';


@Resolver(User)
export default class PatchUserResolver {
    @Authorized()
    @Mutation(() => User)
    public async patchCurrentUser(@Args() newValues: PatchCurrentUserInput,
        @Ctx() context: ApolloServerContext) {
        const jwt = context.koaCtx?.state?.user;

        const user = await User.findOne({
            where: { id: jwt.id },
        });

        if (!user) {
            throw new Error('User not found');
        }

        if (newValues.password) {
            newValues.password = await bcrypt.hash(newValues.password, SALT);
        }

        await user.update({ ...newValues });

        return user;
    }

    @Authorized([Role.USER]) // TODO Role.ADMIN
    @Mutation(() => User)
    public async patchUser(@Args() { id, ...newValues }: PatchUserInput) {
        const user = await User.findOne({
            where: { id },
        });

        if (!user) {
            throw new Error('User not found');
        }

        await user.update({ ...newValues });

        return user;
    }
}
