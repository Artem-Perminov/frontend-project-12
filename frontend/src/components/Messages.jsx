import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';

const Messages = () => {
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus());
  return (
    <Formik
      initialValues={{
        body: '',
      }}
      onSubmit={() => {}}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
          <div className="input-group">
            <input
              ref={inputRef}
              name="body"
              type="text"
              className="form-control border-0 p-0 ps-2"
              placeholder="введите сообщение"
              aria-label=""
              {...formik.getFieldProps('body')}
            />
            <Button type="submit" variant="" className="btn-group-vertical">
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
              <span className="visually-hidden">отправить</span>
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Messages;
