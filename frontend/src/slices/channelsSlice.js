/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const DEFAULT_CHANNEL_ID = '1';
export const fetchChannels = createAsyncThunk('channels/fetchChannels', async (header) => {
  const response = await axios.get(routes.dataPath(), { headers: header });
  return response.data;
});

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: DEFAULT_CHANNEL_ID,
  loadingStatus: 'idle',
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      const id = action.payload;
      state.currentChannelId = id;
    },
    addChannel: (state, action) => {
      channelsAdapter.addOne(state, action.payload);
    },
    removeChannel: (state, action) => {
      channelsAdapter.removeOne(state, action.payload);
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = DEFAULT_CHANNEL_ID;
      }
    },
    updateChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.code;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const selectorStatus = (state) => state.channels.loadingStatus;
export const selectorErr = (state) => state.channels.error;
export const getCurrentChannel = (state) => {
  const selectChannelId = state.channels.currentChannelId;
  const currentChannel = selectors.selectById(state, selectChannelId);
  return currentChannel;
};
export const getChannelNames = (state) => selectors.selectAll(state).map((channel) => channel.name);
export default channelsSlice.reducer;
