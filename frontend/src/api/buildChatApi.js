const buildChatApi = (socket) => {
  const sendMessage = (newMessage) => {
    socket.emit('newMessage', newMessage, (response) => {
      console.log(response);
      if (response.status !== 'ok') {
        throw new Error('Network error: mtssage delivery failed');
      }
    });
  };
  return {
    sendMessage,
  };
};

export default buildChatApi;
