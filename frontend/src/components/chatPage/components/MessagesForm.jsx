/* eslint no-param-reassign: "error" */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useChatAPI, useAuth } from '../../../hooks/index';
import { getCurrentChannel } from '../../../slices/channelsSlice.js';

const Messages = () => {
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));
  const inputRef = useRef();
  const chatApi = useChatAPI();
  const auth = useAuth();
  const { t } = useTranslation();
  useEffect(() => inputRef.current.focus());
  const channelId = useSelector(getCurrentChannel).id;
  return (
    <Formik
      initialValues={{
        body: '',
      }}
      validationSchema={yup.object({
        body: yup
          .string()
          .trim()
          .min(1, 'min 1')
          .required('required'),
      })}
      onSubmit={(values, actions) => {
        const { username } = auth.user;
        const cleanValues = filter.clean(values.body);
        const message = { body: cleanValues, channelId, username };
        try {
          chatApi.sendMessage(message);
        } catch (err) {
          console.log(err);
        }
        values.body = '';
        actions.setSubmitting(false);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              ref={inputRef}
              name="body"
              type="text"
              className="form-control border-0 p-0 ps-2"
              placeholder={t('messages.write_message')}
              aria-label="Новое сообщение"
              {...formik.getFieldProps('body')}
            />
            <Button
              type="submit"
              variant=""
              className="btn-group-vertical btn border-0"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-right-square"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
              <span className="visually-hidden">{t('messages.send')}</span>
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Messages;
