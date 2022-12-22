import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Notfound from './components/pages/Notfound';
import Header from './components/Header';
import routes from './routes';
import { AuthContext } from './context';
import Chat from './components/pages/Chat';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setUser({ username: userData.username });
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('userId'));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  const foo = useMemo(
    () => ({
      logIn,
      logOut,
      getAuthHeader,
      user,
    }),
    [user],
  );
  return <AuthContext.Provider value={foo}>{children}</AuthContext.Provider>;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path={routes.chatPagePath()} element={<Chat />}>
            <Route path="/" element={<Chat />} />
          </Route>
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
