import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';

import { actions as channelsActions, getCurrentChannel } from '../../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../../slices/modalsSlice.js';

export const ChannelButton = ({ channel }) => {
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));
  const dispatch = useDispatch();
  const currentChannelId = useSelector(getCurrentChannel).id;
  const handleChannelClick = (id) => () => dispatch(channelsActions.setCurrentChannelId(id));
  return (
    <Button onClick={handleChannelClick(channel.id)} className="text-start text-truncate w-100 rounded-0" variant={channel.id === currentChannelId ? 'secondary' : ''}>
      <span className="me-1">#</span>
      {filter.clean(channel.name)}
    </Button>
  );
};

export const ChannelDropdownButton = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showModal = (type) => () => dispatch(modalsActions.openModal({ type, channel }));
  const currentChannelId = useSelector(getCurrentChannel).id;
  return (
    <Dropdown className="d-flex btn-group">
      <ChannelButton channel={channel} />
      <Dropdown.Toggle
        split
        variant={channel.id === currentChannelId ? 'secondary' : ''}
        className="flex-grow-0"
      >
        <span className="visually-hidden">{t('channels.control_channel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item role="button" onClick={showModal('remove')} href="#">{t('channels.delete_channel')}</Dropdown.Item>
        <Dropdown.Item role="button" onClick={showModal('rename')} href="#">{t('channels.rename_channel')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
