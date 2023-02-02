import { useContext, createContext } from 'react';

export const AuthContext = createContext({});
export const ApiContext = createContext({});

export const useAuth = () => useContext(AuthContext);
export const useChatAPI = () => useContext(ApiContext);
