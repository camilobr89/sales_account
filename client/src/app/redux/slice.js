// slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Acción asíncrona para registrar un usuario
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/register', userData);
      return response.data;
    } catch (error) {
      let errorMessage = 'Error al registrar el usuario';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Acción asíncrona para iniciar sesión
export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/login', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);


// Acción asíncrona para crear un intencion de venta
export const createSaleIntent = createAsyncThunk(
  'saleIntent/create',
  async (saleData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/sale', saleData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;

      // Eliminar el token del localStorage
      localStorage.removeItem('token');
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(createSaleIntent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSaleIntent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Aquí puedes agregar la intención de venta al estado si lo deseas


      })
      .addCase(createSaleIntent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
      
      
  }
});



export const { logout } = userSlice.actions;

export default userSlice.reducer;

