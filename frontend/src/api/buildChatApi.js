import store from '../slices/index';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelActions } from '../slices/channelsSlice.js';

const buildChatApi = (socket) => {
  const sendMessage = (newMessage) => {
    socket.emit('newMessage', newMessage, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: message delivery failed');
      }
    });
  };

  const addNewChannel = (newChannel) => {
    socket.emit('newChannel', newChannel, (response) => {
      if (response.status === 'ok') {
        store.dispatch(channelActions.addChannel(response.data));
        store.dispatch(channelActions.setCurrentChannelId(response.data.id));
      }
      if (response.status !== 'ok') {
        throw new Error('Network error: channel adding failed');
      }
    });
  };

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel removing failed');
      }
    });
  };
  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel renaming failed');
      }
    });
  };

  socket.on('newMessage', (response) => store.dispatch(messagesActions.addMessage(response)));
  socket.on('newChannel', (response) => store.dispatch(channelActions.addChannel(response)));
  socket.on('removeChannel', (response) => store.dispatch(channelActions.removeChannel(response.id)));
  socket.on('renameChannel', ({ id, name }) => store.dispatch(channelActions.updateChannel({ id, changes: { name } })));

  return {
    sendMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default buildChatApi;
