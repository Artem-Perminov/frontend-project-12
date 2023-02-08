import React from 'react';
import { useSelector } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';

import { getModalType, getModalShow } from '../../../../slices/modalsSlice.js';

import ChannelModal from './components/ChannelModalRename.jsx';
import ChannelModalRemove from './components/ChannelModalRemove.jsx';
import ChannelModalAdd from './components/ChannelModalAdd.jsx';

const Modal = () => {
  const type = useSelector(getModalType);
  const isOpened = useSelector(getModalShow);
  const modalCases = {
    adding: ChannelModalAdd,
    rename: ChannelModal,
    remove: ChannelModalRemove,
  };
  const Component = modalCases[type];
  return (
    <BootstrapModal show={isOpened} centered>
      <Component />
    </BootstrapModal>
  );
};

export default Modal;
