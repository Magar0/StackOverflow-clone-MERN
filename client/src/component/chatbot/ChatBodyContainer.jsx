import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IoSend } from "react-icons/io5";
import { ImCross } from "react-icons/im";

import styles from './commonChat.module.css'
import { chatAiApi } from '../../store/slices/chatAiSlice';
import InputOtp from '../inputOtp/InputOtp';
import AllChat from './AllChat';
import Spinner from '../spinner/Spinner';

const ChatBodyContainer = ({ openChatAi }) => {
    const [inputEmail, setInputEmail] = useState("")
    const token = useSelector((state) => state.chatAi.token)

    const [sendEmail, { isLoading, isError, isSuccess }] = chatAiApi.useSendEmailMutation();

    const handleSendEmail = () => {
        //restricting user from clicking multiple times
        if (!isLoading) {
            sendEmail(inputEmail)
        }
    }
    return (
        <div className={styles.chatBodyContainer}>
            <ImCross color='red' className={styles.chatCloseBtn} onClick={() => openChatAi(false)} />
            {(!token && !isSuccess) &&
                <div className={styles.emailBox}>
                    <p>You can ask our AI any questions or coding related doubts that you would like to know. <br /> But first, you will have to verify Your email </p>
                    <div>
                        <p>Please type your email to send OTP</p>
                        <div className={styles.input}>
                            <input type="email" id="email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder='Type Your email for verification' />
                            {
                                isLoading && <i className={styles.spinnerEmail}><Spinner /></i>
                            }
                            <i className={`${isLoading ? styles.disabled : null}`} ><IoSend onClick={() => handleSendEmail()} /></i>
                        </div>
                        {
                            isError && <p className='error'>Error Sending Email</p>
                        }
                    </div>
                </div>
            }

            {(!token && isSuccess) &&
                <div className={styles.verifyOtpBox}>
                    <p>Otp sent to your email. Please check your email.(if you don't find any email, please check your spam box.)</p>
                    <div>
                        <p>Enter OTP</p>
                        <InputOtp email={inputEmail} />
                    </div>
                </div>
            }

            {token &&
                <AllChat />
            }
        </div>
    )
}

export default ChatBodyContainer