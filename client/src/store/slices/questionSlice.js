import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/index';

export const askQuestions = createAsyncThunk('questions/askQuestions', async (data, { rejectWithValue }) => {
    try {
        const response = await api.postQuestion(data);
        return response.data;
    } catch (error) {
        if (error.response?.data) {
            return rejectWithValue(error.response.data);
        } else if (error.message) {
            return rejectWithValue({ message: error.message });
        } else {
            return rejectWithValue({ message: 'Something went wrong. Please try again later.' });
        }
    }
})

export const fetchAllQuestion = createAsyncThunk('questions/fetchAllQuestions', async () => {
    const response = await api.getAllQuestion();
    return response.data;
})

export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (id) => {
    const response = await api.deleteQuestion(id);
    return response.message;
})

export const voteQuestion = createAsyncThunk('questions/voteQuestion', async (data) => {
    const response = await api.voteQuestion(data.id, data.value)
    return response.data;
})

export const postAnswer = createAsyncThunk('questions/postAnswer', async (data) => {
    const response = await api.postAnswer(data);
    return response;
})

export const deleteAnswer = createAsyncThunk('questions/deleteAnswer', async (data) => {
    const response = await api.deleteAnswer(data)
    return response.message;
})

const initialState = {
    data: null,
    loading: false,
    success: false,
    error: null,
}

const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //ask question...
            .addCase(askQuestions.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(askQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.data = action.payload
            })
            .addCase(askQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = null;
            })

            //fetch all question...
            .addCase(fetchAllQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllQuestion.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.data = null;
            })

            //delete question....
            .addCase(deleteQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteQuestion.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.data = null;
            })

            //vote question....
            .addCase(voteQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(voteQuestion.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(voteQuestion.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.data = null;
            })

            //post answer...
            .addCase(postAnswer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postAnswer.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(postAnswer.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.data = null;
            })

            //delete answer....
            .addCase(deleteAnswer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAnswer.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteAnswer.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.data = null;
            })


    }
})


export default questionSlice.reducer;