import { useEffect, useState } from 'react'
import { RiRobot2Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';

import styles from './commonChat.module.css'
import ChatBodyContainer from './ChatBodyContainer';

const ChatAi = () => {
    const [isChatAiOpen, setIsChatAiOpen] = useState(false)
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme)

    const openChatAi = () => {
        setIsChatAiOpen(false)
    }

    return (
        <div className={`${styles.chatBox} ${theme === "night" ? styles.chatBoxNight : null}`} >

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