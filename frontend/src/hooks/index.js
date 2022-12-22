import { useContext } from 'react';

import { AuthContext, ApiContext } from '../context';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(ApiContext);
