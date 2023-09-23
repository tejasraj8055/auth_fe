//rxslice

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postHttp } from '../utils/axiosHandler';
import { authUrl } from '../utils/config';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import ResetPassword from './../pages/reset-password/ResetPassword';

const initialState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    token: null,
    isPasswordReset: false
}

export const login = createAsyncThunk(
    'auth/login',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await postHttp(authUrl + 'login', payload);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);

        }
    }

);
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await postHttp(authUrl + 'forgot-password', payload);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);

        }
    }

);
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await postHttp(authUrl + 'reset-password', payload);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);

        }
    }

);

export const logout = createAsyncThunk(
    'auth/logout',
    async (payload, { rejectWithValue }) => {
      try {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('menu');
        const response = await postHttp(authUrl + 'logout', payload);
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  );
  




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        RESET: (state, action) => {
            state.user = null
            state.isLoading = false
            state.isAuthenticated = false
            state.token = null
            state.isPasswordReset = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.token = action.payload.token
            //localstorage set item isAuthenticted
            localStorage.setItem('isAuthenticated', true)
            // store menu in localstorage
            console.log(action.payload)
            localStorage.setItem('menu', JSON.stringify(action.payload.data.menu))

        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = false
            state.user = null
            state.token = null
            // notifyError(action.payload.message)
            notification.error({
                message: action.payload.message || 'Invalid Request',
                placement: 'bottomRight',
                duration: 3
            });
        })
        builder.addCase(forgotPassword.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false
            notification.success({
                message: action.payload.message || 'Invalid Request',
                placement: 'bottomRight',
                duration: 3
            });
        })
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false
            notification.error({
                message: action.payload.message || 'Invalid Request',
                placement: 'bottomRight',
                duration: 3
            });
        })
        builder.addCase(resetPassword.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.isPasswordReset = true
            notification.success({
                message: action.payload.message || 'Invalid Request',
                placement: 'bottomRight',
                duration: 3
            });
        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false
            notification.error({
                message: action.payload.message || 'Invalid Request',
                placement: 'bottomRight',
                duration: 3
            });
        })
    }
})

export const { RESET } = authSlice.actions

export default authSlice.reducer