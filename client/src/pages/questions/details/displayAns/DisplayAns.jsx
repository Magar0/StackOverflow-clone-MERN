import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import Avatar from '../../../../component/avatar/Avatar'
import styles from './DisplayAns.module.css'
import { deleteAnswer, fetchAllQuestion } from '../../../../store/slices/questionSlice';

const DisplayAns = ({ ques, user, handleShare }) => {

    const dispatch = useDispatch()

    const handleDelete = async (answerId) => {
        await dispatch(deleteAnswer({
            questionId: ques._id,
            answerId,
            noOfAnswers: ques.answer.length - 1
        }))
        await dispatch(fetchAllQuestion())
    }

    return (
        <>
            {
                ques.answer.map(ans => (
                    <div className={styles['display-ans']} key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className={styles['ques-action-user']}>
                            <div>
                                <button onClick={handleShare}>Share</button>
                                {
                                    (user?.data?._id === ans.userId) &&
                                    <button onClick={() => handleDelete(ans._id)}>Delete</button>
                                }
                            </div>
                            <div>
                                <p className='ans-time'>answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/users/${ques.userId}`} className={styles.userLink}>
                                    <Avatar avatarStyle={""}>{ans.userAnswered.charAt(0)} </Avatar>
                                    <div className='user-ans'>{ans.userAnswered}</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default DisplayAns;