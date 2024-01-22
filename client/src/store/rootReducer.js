import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import questionSlice from "./slices/questionSlice";
import currentUserSlice from './slices/currentUserSlice'
import userSlice from './slices/userSlice'

const rootReducer = combineReducers({
    auth: authSlice,
    questions: questionSlice,
    currentUser: currentUserSlice,
    users: userSlice
})

export default rootReducer;