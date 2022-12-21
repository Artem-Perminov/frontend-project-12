import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const Header = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <div className="container">
      <Navbar.Brand>
        <Link to="/">New Slack!</Link>
      </Navbar.Brand>
    </div>
  </Navbar>
);

export default Header;
