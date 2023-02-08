import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import * as yup from 'yup';
import { toast } from 'react-toastify';
import { getChannelNames } from '../../../../../slices/channelsSlice.js';
import { actions as modalsActions, getModal } from '../../../../../slices/modalsSlice.js';
import { useChatAPI } from '../../../../../hooks/index';

const ModalWindow = () => {
  const chatApi = useChatAPI();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  useEffect(() => inputRef.current.focus(), []);

  const channelNames = useSelector(getChannelNames);

  const closeModal = () => dispatch(modalsActions.closeModal());
  const { extraData } = useSelector(getModal);

  const onRename = (name) => {
    try {
      chatApi.renameChannel({ id: extraData.id, name });
      toast.success(t('success_message.channel_renamed'));
    } catch (err) {
      toast.error(t('errors.errors_network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('errors.validation.required_field')
        .notOneOf(channelNames, 'errors.validation.channel_already_exists'),
    }),
    onSubmit: ({ name }) => {
      onRename(name);
      closeModal();
    },
  });

  return (
    <>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title className="h4">{t('modal.rename_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <Form.Control
              isInvalid={formik.touched.name && formik.errors.name}
              ref={inputRef}
              onChange={formik.handleChange}
              className="mb-2"
              name="name"
              id="name"
              value={formik.values.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modal.name_channel')}
            </Form.Label>
            {formik.touched.name && formik.errors.name ? (
              <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>
            ) : null}
            <div className="d-flex justify-content-end">
              <Button onClick={closeModal} type="button" variant="secondary" className="me-2">
                {t('modal.cancel')}
              </Button>
              <Button type="submit">{t('modal.send')}</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ModalWindow;
