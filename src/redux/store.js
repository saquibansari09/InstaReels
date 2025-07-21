import { configureStore } from '@reduxjs/toolkit';
import reelsReducer from './reducers';

export const store = configureStore({
  reducer: {
    reels: reelsReducer,
  },
});
