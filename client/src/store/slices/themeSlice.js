import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action) {
            return action.payload
        }
    }
})

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;