import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: null,
    reducers: {
        setCurrentUser(state, action) {
            return action.payload
        },
        updateCurrentUser(state, action) {
            state.data = action.payload
        }
    }
})

export const { setCurrentUser, updateCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;