import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import questionSlice from "./slices/questionSlice";
import currentUserSlice from './slices/currentUserSlice'
import userSlice from './slices/userSlice'
import themeSlice from "./slices/themeSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    questions: questionSlice,
    currentUser: currentUserSlice,
    users: userSlice,
    theme: themeSlice
})

export default rootReducer;