import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import routes from '../routes';

const PrivateRout = ({ children }) => {
  const auth = useAuth();
  return (!auth.user) ? children : <Navigate to={routes.chatPagePath()} />;
};
export default PrivateRout;
