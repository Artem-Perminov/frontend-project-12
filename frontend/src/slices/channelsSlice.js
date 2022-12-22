import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';
import useAuth from '../hooks/index.js';

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async () => {
  const auth = useAuth();
  const response = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
  console.log(response.data.channels);
  return response.data.channels;
});

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: '',
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, channelsAdapter.addMany);
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
