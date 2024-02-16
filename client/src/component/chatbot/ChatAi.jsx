import { useEffect, useState } from 'react'
import { RiRobot2Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';

import styles from './commonChat.module.css'
// import { addChat, setToken } from '../../store/slices/chatAiSlice';
import ChatBodyContainer from './ChatBodyContainer';

const ChatAi = () => {
    const [isChatAiOpen, setIsChatAiOpen] = useState(false)
    const dispatch = useDispatch()

    const openChatAi = () => {
        setIsChatAiOpen(false)
    }

    //to fetch token from local storage ....
    // useEffect(() => {
    //     const chatAi = JSON.parse(localStorage.getItem("chatAi"))
    //     if (chatAi?.token) {
    //         dispatch(setToken(chatAi.token))
    //         dispatch(addChat(chatAi.chat))
    //     }
    // }, [])
    return (
        <div className={styles.chatBox}>

            {!isChatAiOpen &&
                <RiRobot2Line className={styles.chatAiIcon} onClick={() => setIsChatAiOpen(true)} />
            }
            {
                isChatAiOpen &&
                <ChatBodyContainer openChatAi={openChatAi} />
            }

        </div>
    )
}

export default ChatAi