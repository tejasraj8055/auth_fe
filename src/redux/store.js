import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import homeReducer from './homeSlice';

const store = configureStore({
    reducer:{
        auth:authReducer,
        home:homeReducer
    }
})

export default store;