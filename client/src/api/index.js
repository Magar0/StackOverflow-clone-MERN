import axios from 'axios';

const URL = process.env.REACT_APP_URL || 'http://localhost:4000'
const API = axios.create({ baseURL: URL })

API.interceptors.request.use((req) => {
    const user = localStorage.getItem('Profile')
    if (user) {
        req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
    }
    return req;
})

//authorization
export const login = (authData) => API.post('/user/login', authData)
export const signup = (authData) => API.post('/user/signup', authData)

//questions
export const postQuestion = (questionData) => API.post('/questions', questionData)
export const deleteQuestion = (id) => API.delete(`/questions/${id}`)
export const getAllQuestion = () => API.get('/questions')
export const voteQuestion = (id, value) => API.patch(`/questions/vote/${id}`, { value })

//answers
export const postAnswer = (data) => API.patch(`/answers/post/${data.questionId}`, data)
export const deleteAnswer = (data) => API.patch(`/answers/delete/${data.questionId}`, data)

//users
export const getAllUsers = () => API.get(`/user/getAllUsers`)
export const updateProfile = (data) => API.patch(`/user/update/${data.id}`, data)
export const deleteUser = () => API.delete(`/user/delete`)


