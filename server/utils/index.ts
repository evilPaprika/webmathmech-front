import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

import { IJWTPayLoad } from '../types/jwt';
import { JWT_TOKEN_EXPIRATION_TIME } from '../consts';


export function createJWTToken(payload: IJWTPayLoad) {
    return jsonwebtoken.sign(payload, config.JWTSecret, { expiresIn: JWT_TOKEN_EXPIRATION_TIME });
}
