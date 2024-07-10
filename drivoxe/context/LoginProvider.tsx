// src/context/LoginProvider.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/api';
import { decodeToken, isTokenExpired } from '../utils/jwtUtils';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface LoginProviderProps {
    children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadUserFromStorage = async () => {
            const token = await authService.getToken();
            const secretKey = '860e3dab94e6b0d8ae7ee3de4a849fae147ec0465cf6c8b5ef148565339c0f03';
            if(token){
                setIsAuthenticated(true);
                
            };

        };
        loadUserFromStorage();
    }, []);

    const login = async (email: string, password: string) => {
        const token = await authService.login(email, password);
        const secretKey = '860e3dab94e6b0d8ae7ee3de4a849fae147ec0465cf6c8b5ef148565339c0f03';
        if(token){
            setIsAuthenticated(true);
            
        };

    };

    const logout = async () => {
        await authService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
