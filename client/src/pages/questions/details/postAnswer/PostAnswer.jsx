import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './postAnswer.module.css'
import { fetchAllQuestion, postAnswer } from '../../../../store/slices/questionSlice'

const PostAnswer = ({ ques, user, questionId }) => {

    const [answer, setAnswer] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please Login or signup to answer')
        } else if (!answer.trim()) {
            alert("Enter an answer")
        } else {
            setAnswer("")
            await dispatch(postAnswer({
                questionId,
                userAnswered: user.data.name,
                answerBody: answer,
                noOfAnswers: ques.noOfAnswers + 1
            }));
            await dispatch(fetchAllQuestion())
        }

    }

    return (
        <section className={styles['post-ans-container']}>
            <h3>Your Answer</h3>
            <form onSubmit={handleSubmit}>
                <textarea name="ans" id="ans" cols="30" rows="10" value={answer} onChange={(e) => setAnswer(e.target.value)} required ></textarea>
                <button type='submit' className={styles.postAnsBtn}>Post Your Answer</button>
            </form>
            <p>
                Browse other Question tagged
                {
                    ques.questionTags.map(tag => (
                        <Link to='/tags' key={tag} className={styles.ansTags}> {tag} </Link>
                    ))
                } or
                <Link to={'/askquestion'} className={styles.link} > ask your own question</Link>
            </p>
        </section>
    )
}

export default PostAnswer;