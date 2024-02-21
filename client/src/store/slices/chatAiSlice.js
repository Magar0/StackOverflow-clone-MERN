import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const URL = process.env.REACT_APP_URL || 'http://localhost:4000'


const chatAiSlice = createSlice({
    name: "chatAiToken",
    initialState: {
        token: null,
        chat: ["Hello! How can I assist you today?"]
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        addChat(state, action) {
            state.chat.push(...[action.payload.ques], [action.payload.ans])
        }

    }
})

//RTK query 
const baseQuery = fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().chatAi?.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
    }
})

export const chatAiApi = createApi({
    reducerPath: 'chatAiApi',
    baseQuery,
    endpoints: (build) => ({
        sendEmail: build.mutation({
            query: (email) => ({
                url: '/chatai/sendotp',
                method: 'POST',
                body: { email }
            })
        }),

        verifyOtp: build.mutation({
            query: ({ email, otp }) => ({
                url: '/chatai/verifyotp',
                method: 'POST',
                body: { email, otp }
            }),
        }),
        askChatAi: build.mutation({
            query: (question) => ({
                url: '/chatai/ask',
                method: 'POST',
                body: { question }
            }),
        })

    })
})

export const { useSendEmailMutation, useVerifyOtpMutation, useAskChatAiMutation } = chatAiApi;
export const { setToken, addChat } = chatAiSlice.actions;
export default chatAiSlice.reducer;