import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <Outlet />
  </div>
);

export default Layout;
