import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSend } from "react-icons/io5";

import styles from './commonChat.module.css';
import { addChat, chatAiApi } from '../../store/slices/chatAiSlice';
import Spinner from '../spinner/Spinner';

const AllChat = () => {

    const [inputQues, setInputQues] = useState("");
    const chat = useSelector((state) => state.chatAi.chat);
    const [askChatAi, { data, isLoading, isError, isSuccess }] = chatAiApi.useAskChatAiMutation();
    const dispatch = useDispatch();


    const handleClick = () => {
        if (!isLoading) {
            askChatAi(inputQues);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    useEffect(() => {
        if (data) {
            dispatch(addChat({ ques: inputQues, ans: data.answer }))
            setInputQues("")
        }
    }, [isSuccess])

    return (
        <div className={styles.chatBox}>
            <div className={styles.chat}>
                {
                    chat.length > 0 && chat.map((message, ind) => (
                        <p key={ind}>{message}</p>
                    )
                    )
                }
            </div>

            <div className={styles.bottom_part}>
                <div className={styles.input}>
                    <input type="ques" id="ques" value={inputQues} onChange={(e) => setInputQues(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                    {
                        isLoading && <i className={styles.spinnerEmail}><Spinner /></i>
                    }
                    <i className={`${isLoading ? styles.disabled : null}`} ><IoSend onClick={() => handleClick()} /></i>
                </div>
                {isError && <p className={styles.error}>Error occured...</p>}
            </div>
        </div>

    )
}

export default AllChat