import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer";
import { chatAiApi } from "./slices/chatAiSlice";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(chatAiApi.middleware)
})

export default store;
