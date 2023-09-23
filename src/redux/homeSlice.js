import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getHttp } from '../utils/axiosHandler';
import { employeeUrl } from '../utils/config';

const initialState = {
    employees: [],
    isLoading: false,
}

export const getAllEmployees = createAsyncThunk(
    'home/getAllEmployees',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await getHttp(employeeUrl + 'getAll');
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);

        }
    }

);

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllEmployees.pending]: (state, action) => {
            state.isLoading = true
        },
        [getAllEmployees.fulfilled]: (state, action) => {
            state.isLoading = false
            state.employees = action.payload
        },
        [getAllEmployees.rejected]: (state, action) => {
            state.isLoading = false
            state.employees = []
        },
    }
});

export const { } = homeSlice.actions

export default homeSlice.reducer