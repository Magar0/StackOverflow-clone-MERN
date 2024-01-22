import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../../api/index'


export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    const response = await api.getAllUsers();
    return response;
})

export const updateProfile = createAsyncThunk('user/updateProfile', async (data) => {
    const response = await api.updateProfile(data);
    return response;
})

export const deleteUser = createAsyncThunk('user/deleteProfile', async () => {
    const response = await api.deleteUser()
    return response;
})

const initialState = {
    data: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getting all users
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })

            // updating profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateProfile.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })

            //delete profile
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteUser.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export default userSlice.reducer;