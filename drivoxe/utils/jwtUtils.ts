import { JwtPayload } from 'jwt-decode';
import JWT from 'expo-jwt';
import { User } from '../config/types'; // Adjust the path to where your User interface is located

interface DecodedToken extends JwtPayload, Partial<User> {}

export const decodeToken = (token: string, key: string): DecodedToken => {
    return JWT.decode(token, key);
};

export const isTokenExpired = (token: string, key: string): boolean => {
    const decoded = JWT.decode(token, key);
    return decoded.exp ? decoded.exp < Date.now() / 1000 : true;
};
