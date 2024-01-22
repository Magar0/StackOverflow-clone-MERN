import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../../api/index';

export const signup = createAsyncThunk('auth/signup', async (authData, { rejectWithValue }) => {
    try {
        const response = await api.signup(authData);
        localStorage.setItem('Profile', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong. Please try again later.' });
        }
    }
}
);

export const login = createAsyncThunk('auth/login', async (authData, { rejectWithValue }) => {
    try {
        const response = await api.login(authData);
        localStorage.setItem('Profile', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong. Please try again later.' });
        }
    }
}
);


const initialState = {
    data: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //sign up
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //log in
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export const { logout } = authSlice.actions
export default authSlice.reducer;