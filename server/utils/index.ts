import config from 'config';
import jsonwebtoken from 'jsonwebtoken';

import { JWT_TOKEN_EXPIRATION_TIME } from '../consts';
import { IJWTPayLoad } from '../types/jwt';


export function createJWTToken(payload: IJWTPayLoad) {
    return jsonwebtoken.sign(payload, config.JWTSecret, { expiresIn: JWT_TOKEN_EXPIRATION_TIME });
}
