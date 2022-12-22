import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useAuth } from '../hooks';

const AuthButton = () => {
  const auth = useAuth();
  return auth.user && <Button onClick={auth.logOut}>Выйти</Button>;
};

const Header = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <div className="container">
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      <AuthButton />
    </div>
  </Navbar>
);

export default Header;
