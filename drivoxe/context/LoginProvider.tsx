import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for context values
interface Profile {
  name: string;
  email: string;
  // Add more fields as needed
}

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

// Create context for login state
const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  profile: { name: '', email: '' },
  setProfile: () => {},
});

// Define props type for LoginProvider
interface LoginProviderProps {
  children: ReactNode;
}

// Create provider component
const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({ name: '', email: '' });

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, profile, setProfile }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook for using login context
export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
