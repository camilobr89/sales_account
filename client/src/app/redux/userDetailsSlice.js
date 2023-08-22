// userDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción asíncrona para obtener los detalles del usuario
export const fetchUserDetails = createAsyncThunk(
  'userDetails/fetchUserDetails',
  async (sale_id) => {
    const response = await axios.get(`http://localhost:3001/user/${sale_id}/detail`);
    return response.data;
  }
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: {
    [fetchUserDetails.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUserDetails.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    },
    [fetchUserDetails.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default userDetailsSlice.reducer;
