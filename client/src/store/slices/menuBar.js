import { createSlice } from "@reduxjs/toolkit";

const menuBarSlice = createSlice({
    name: 'menuBar',
    initialState: false,
    reducers: {
        setMenuBar(state, action) {
            return !state;
        }
    }
})

export default menuBarSlice.reducer;
export const { setMenuBar } = menuBarSlice.actions;