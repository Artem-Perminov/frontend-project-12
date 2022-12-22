import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
  },
});
console.log(store.getState());

export default store;
