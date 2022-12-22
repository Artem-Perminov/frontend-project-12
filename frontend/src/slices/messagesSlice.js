import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// import { actions as channelsActions } from './channelsSlice.js';

const messageAdapter = createEntityAdapter();
const initialState = messageAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messageAdapter.addOne,
    addMessages: messageAdapter.addMany,
  },
});

export const selectors = messageAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
