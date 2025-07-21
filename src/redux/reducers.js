import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedReels: [],
};

const reelsSlice = createSlice({
  name: 'reels',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const index = state.likedReels.indexOf(action.payload);
      if (index >= 0) {
        state.likedReels.splice(index, 1);
      } else {
        state.likedReels.push(action.payload);
      }
    },
  },
});

export const { toggleLike } = reelsSlice.actions;
export default reelsSlice.reducer;
