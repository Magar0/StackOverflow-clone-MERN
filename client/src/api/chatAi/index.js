import axios from "axios";

const URL = process.env.REACT_APP_URL || 'http://localhost:4000'
const API = axios.create({ baseURL: URL })

API.interceptors.request.use(req => {
    //code
    return req;
})

export const sendEmail = (email) = API.post('/', email)
export const verifyOtp = (otp) = API.post('/', otp)

export const askChatAi = (ques) = API.post('/', ques)