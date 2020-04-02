/* eslint-disable @typescript-eslint/camelcase */
import queryString from 'query-string';
import fetch from 'node-fetch';
import config from 'config';


interface VkGetUserRequest {
    user_id: number;
    access_token: string;
}

interface VkGetUserResponse {
    response: Array<{
        first_name: string;
        last_name: string;
    }>;
}

export async function fetchVkUserInfo({ user_id, access_token }: VkGetUserRequest) {
    const url = `https://api.vk.com/method/users.get?${queryString.stringify({ user_id, access_token })}&v=5.52`;

    const raw = await fetch(url);
    const { response: [response] }: VkGetUserResponse = await raw.json();

    return { ...response };
}

interface VkUserIdAndAccessTokenResponse {
    user_id: number;
    access_token: string;
}

export async function getVkUserIdAndAccessToken(code: string): Promise<VkUserIdAndAccessTokenResponse> {
    const query = queryString.stringify({
        client_id: config.vkOAuth.clientId,
        client_secret: config.vkOAuth.clientSecret,
        redirect_uri: config.vkOAuth.redirectURI,
        v: config.vkOAuth.version,
        code
    });
    const url = `https://oauth.vk.com/access_token?${query}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to get access_token from vk oauth\n ${response.body}`);
    }

    return response.json();
}
