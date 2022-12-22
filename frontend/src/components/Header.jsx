import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import useAuth from '../hooks/index.js';

const AuthButton = () => {
  const auth = useAuth();
  return auth.user && <Button onClick={auth.logOut}>Выйти</Button>;
};

const Header = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <div className="container">
      <Navbar.Brand>
        <Link to="/">New Slack!</Link>
      </Navbar.Brand>
      <AuthButton />
    </div>
  </Navbar>
);

export default Header;
