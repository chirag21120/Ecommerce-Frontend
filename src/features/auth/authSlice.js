import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authAPI';

const initialState = {
  loggedInUserToken: null,
  status: 'idle',
  errors: null,
};


export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (userData,{rejectWithValue}) => {
    try {
      const response = await checkUser(userData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error)
    }
  }
);
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (userId) => {
    const response = await signOut(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.errors = null;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
        state.errors = null;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.payload;
        state.loggedInUserToken= null;
      });
  },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state)=>state.auth.loggedInUserToken;
export const selectErrors = (state)=>state.auth.errors;
export default authSlice.reducer;
