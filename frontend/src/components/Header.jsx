import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index';
import routes from '../routes';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand href="/">{t('navbar.header')}</Navbar.Brand>
        {auth.user && (
          <Button href={routes.loginPagePath()} onClick={auth.logOut}>
            {t('navbar.btn_out')}
          </Button>
        )}
      </div>
    </Navbar>
  );
};
export default Header;
