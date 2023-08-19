import { createSlice } from '@reduxjs/toolkit';

export const Slice = createSlice({
    name: 'values',
    initialState: {
      name: 'JAB',
    },
    reducers: {
      setName: (state, action) => {
        state.name = action.payload;
      },
    },
  });

export const { setName } = Slice.actions;
