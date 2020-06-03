/* eslint-disable @typescript-eslint/camelcase */
import {
    Args,
    Mutation,
    Resolver,
} from 'type-graphql';

import { Role } from '../models/EnumModels';
import Token from '../models/Token';
import User from '../models/User.sequelize';
import { createJWTToken } from '../utils';
import { fetchVkUserInfo, getVkUserIdAndAccessToken } from '../utils/vkApiMethods';
import { VkSignInput } from './inputs/AuthThirdPartyInputs';


@Resolver()
export default class AuthThirdPartyResolver {
    @Mutation(() => Token)
    public async authVk(@Args() { code }: VkSignInput) {
        const { user_id: vkUserId, access_token } = await getVkUserIdAndAccessToken(code);
        const login = `vk.${vkUserId}`;
        const user = await User.findOne({ where: { login } });

        if (user) {
            return { token: createJWTToken({ id: user.id }) };
        }

        const { first_name: name, last_name: surname } = await fetchVkUserInfo({ user_id: vkUserId, access_token });

        const newUser = await User.create({
            name,
            surname,
            login: login.toLowerCase(),
            role: Role.USER
        });

        return { token: createJWTToken({ id: newUser.id }) };
    }
}
