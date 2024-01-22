import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: null,
    reducers: {
        setCurrentUser(state, action) {
            return action.payload
        }
    }
})

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;