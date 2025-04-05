import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  updateUserApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';
import { TUser } from '@utils-types';

interface UserState {
  user: TUser | null;
  isUserAuthChecked: boolean;
  isUserAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  isUserAuthChecked: false,
  isUserAuthenticated: false,
  loading: false,
  error: null
};

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    const response = await registerUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    const response = await loginUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();
    if (!response.success) {
      return rejectWithValue(response);
    }
    deleteCookie('accessToken');
    localStorage.clear();
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    const response = await updateUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    userSelector: (state) => state.user,
    isUserAuthCheckedSelector: (state) => state.isUserAuthChecked,
    isUserAuthenticatedSelector: (state) => state.isUserAuthenticated
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.isUserAuthChecked = true;
      state.isUserAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isUserAuthChecked = true;
      state.isUserAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.isUserAuthChecked = true;
      state.isUserAuthenticated = false;
      state.loading = false;
      state.user = null;
    });
    builder.addCase(getUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.isUserAuthChecked = true;
      state.isUserAuthenticated = true;
      state.user = action.payload.user;
    });
    builder.addCase(updateUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
  }
});

export const userReducer = userSlice.reducer;
export const {
  userSelector,
  isUserAuthCheckedSelector,
  isUserAuthenticatedSelector
} = userSlice.selectors;
