import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './loginPage/LoginPage.jsx';
import NotFoundPage from './notFoundPage/NotFoundPage.jsx';
import ChatPage from './chatPage/ChatPage.jsx';
import Registration from './signupPage/Registration.jsx';
import routes from '../routes.js';
import { useAuth } from '../hooks/index';
import AuthProvider from '../api/AuthProvider.jsx';
import Layout from './Layout.jsx';
import PrivateRout from '../PrivateRout.jsx';

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path={routes.chatPagePath()} element={<Layout />}>
          <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
            <Route path="" element={<ChatPage />} />
          </Route>
          <Route
            path={routes.signupPagePath()}
            element={
              (
                <PrivateRout>
                  <Registration />
                </PrivateRout>
              )
            }
          />
          <Route
            path={routes.loginPagePath()}
            element={
              (
                <PrivateRout>
                  <LoginPage />
                </PrivateRout>
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
  </AuthProvider>
);

export default App;
