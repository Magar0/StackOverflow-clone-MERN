import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { chatAiApi, setToken } from '../../store/slices/chatAiSlice';
import styles from './inputOtp.module.css'
import { logDOM } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Spinner from '../spinner/Spinner';

const InputOtp = ({ email }) => {
    const [otp, setOtp] = useState('');
    const [customError, setCustomError] = useState();
    const [verifyOtp, { data, isLoading, isSuccess, error }] = chatAiApi.useVerifyOtpMutation();
    const dispatch = useDispatch();

    const handleVerify = () => {
        if (isLoading) {
            return;
        }
        if (otp.length < 6) {
            setCustomError("Enter 6 Character OTP")
            return;
        } else {
            setCustomError();
            verifyOtp({ email, otp })
        }
    }

    useEffect(() => {
        if (data?.token) {
            // localStorage.setItem("chatAi", JSON.stringify({ token: data.token, chat: [] }))
            dispatch(setToken(data.token));
        }
    }, [data, isSuccess])

    useEffect(() => {
        if (error) {
            if (error.status === 400) {
                setCustomError("Invalid OTP")
            } else {
                setCustomError("Error ocured verifying Otp")
            }
        }
    }, [error])

    return (

        <div className={styles.inputOtp}>

            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                shouldAutoFocus={true}
                renderInput={(props) => <input {...props} />}
            />
            {
                isLoading && <i className={styles.spinnerEmail}><Spinner /></i>
            }
            {
                customError && <p className='error'>{customError}</p>
            }
            <button onClick={() => handleVerify()}> Verify OTP</button>

        </div>
    );
}

export default InputOtp;