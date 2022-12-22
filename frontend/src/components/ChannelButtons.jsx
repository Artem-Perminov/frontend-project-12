import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { actions as channelsActions } from '../slices/channelsSlice.js';

const ChannelButton = ({ channel }) => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channels);
  const handleChannelClick = (id) => () => dispatch(channelsActions.setCurrentChannelId(id));
  return (
    <Button
      onClick={handleChannelClick(channel.id)}
      className="text-start text-truncate w-100 rounded-0"
      variant={channel.id === currentChannelId ? 'secondary' : ''}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};

export default ChannelButton;
