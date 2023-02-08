import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../hooks/index';
import routes from '../../routes.js';
import avatar from '../../assets/avatar.jpg';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response.data);
        const { from } = location.state || { from: { pathname: routes.chatPagePath() } };
        navigate(from);
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.errors_unknown'));
          return;
        }
        if (error.response?.status === 401) {
          setAuthFailed(true);
          inputRef.current.focus();
        } else {
          toast.error(t('errors.errors_network'));
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100 mt-5">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatar} className="rounded-circle" alt={t('login_page.avatar')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login_page.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username || ''}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                    placeholder={t('login_page.placeholder')}
                  />
                  <label htmlFor="username">{t('login_page.placeholder')}</label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                    placeholder={t('login_page.password')}
                  />
                  <Form.Label htmlFor="password">{t('login_page.password')}</Form.Label>
                  {authFailed && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {t('errors.errors_unregistered')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={formik.isSubmitting}>
                  {t('login_page.btn_in')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('login_page.no_account')}
                  {' '}
                </span>
                <Link to={routes.signupPagePath()}>{t('login_page.registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
