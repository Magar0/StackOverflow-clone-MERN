import React from 'react'
import { Link } from 'react-router-dom'
import { RiQuestionnaireFill } from "react-icons/ri";
import { AiTwotoneTags } from "react-icons/ai";
import { IoTrophySharp } from "react-icons/io5";

const AboutAuth = () => {
    return (
        <>
            <div className='auth-container-1'>
                <h2>Join the Stack Overflow community</h2>
                <ul>
                    <li>
                        <i><RiQuestionnaireFill /></i>
                        Get unstuck — ask a question
                    </li>
                    <li>
                        Unlock new privileges like voting and commenting
                    </li>
                    <li>
                        <i><AiTwotoneTags /></i>
                        Save your favorite questions, answers, watch tags, and more

                    </li>
                    <li>
                        <i><IoTrophySharp /></i>
                        Earn reputation and badges
                    </li>
                </ul>

                <p className='light-color'>Collaborate and share knowledge with a private group for FREE.</p>
                <Link to='/auth' >Get Stack Overflow for Teams free for up to 50 users.</Link>

            </div>





        </>
    )
}

export default AboutAuth