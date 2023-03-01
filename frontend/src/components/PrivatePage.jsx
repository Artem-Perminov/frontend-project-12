import React, { useEffect } from 'react';
import {
  Container, Row, Col, Button, Nav,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels, selectors } from '../slices/channelsSlice';
import ChannelButton from './ChannelButtons';
import MessagesForm from './MessagesForm';
import { selectors as messagesSelectors } from '../slices/messagesSlice';

const PrivatePage = () => {
  const dispatch = useDispatch();
  dispatch(fetchChannels());
  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);
  const channels = useSelector(selectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <Button variant="" className="p-0 btn-group-vertical text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <Nav fill variant="pills" className="flex-column px-2" defaultActiveKey="">
            {channels.map((channel) => (
              <Nav.Item key={channel.id} className="w-100">
                <ChannelButton channel={channel} />
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {' '}
                  {channels
                    .filter((channel) => channel.id === currentChannelId)
                    .map((channel) => channel.name)
                    .join('')}
                </b>
              </p>
              <span className="text-muted">
                {currentMessages.length}
                {' '}
                сообщений
              </span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {currentMessages.map((message) => (
                <div key={message.id} className="text-break mb-2">
                  <b>{message.username}</b>
                  <span>: </span>
                  {message.body}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto px-5 py-3">
            <MessagesForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivatePage;
