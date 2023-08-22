import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción asíncrona para obtener todas las intenciones de compra
export const fetchSaleIntents = createAsyncThunk(
  'saleIntents/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/buy');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

// Acción asíncrona para completar una intención de compra
export const completeSaleIntent = createAsyncThunk(
  'saleIntents/complete',
  async (sale_id, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3001/buy/complete/${sale_id}?_=${Date.now()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

// Acción asíncrona para cancelar una intención de compra
export const cancelSaleIntent = createAsyncThunk(
  'saleIntents/cancel',
  async (sale_id, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3001/buy/cancel/${sale_id}?_=${Date.now()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);


const saleIntentsSlice = createSlice({
  name: 'saleIntents',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleIntents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSaleIntents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSaleIntents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(completeSaleIntent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(completeSaleIntent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Aquí puedes actualizar la intención de compra en el estado si lo deseas
      })
      .addCase(completeSaleIntent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(cancelSaleIntent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelSaleIntent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Aquí puedes actualizar la intención de compra en el estado si lo deseas
      })
      .addCase(cancelSaleIntent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
      
  }
});

export default saleIntentsSlice.reducer;
