import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        alt="Page Not Found"
        className="img-fluid h-25"
        src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg"
      />
      <h1 className="h4 text-muted">{t('not_found_page.not_found')}</h1>
      <p className="text-muted">
        {t('not_found_page.to_home1')}
        <a href="/">{t('not_found_page.to_home2')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
