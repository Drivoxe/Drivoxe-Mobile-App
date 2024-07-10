// src/utils/jwtUtils.ts
import { JwtPayload } from 'jwt-decode';
import JWT from 'expo-jwt';

interface DecodedToken extends JwtPayload {
    [key: string]: any;
}

export const decodeToken = (token: string, key: string): DecodedToken => {
    return JWT.decode(token, key);
};

export const isTokenExpired = (token: string, key: string): boolean => {
    const decoded = JWT.decode(token, key);
    return decoded.exp ? decoded.exp < Date.now() / 1000 : true;
};
