import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

import styles from './questionBody.module.css'
import Avatar from "../../../../component/avatar/Avatar";
import { deleteQuestion, fetchAllQuestion, voteQuestion } from "../../../../store/slices/questionSlice";


const QuestionBody = ({ ques, user, handleShare }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = () => {
        dispatch(deleteQuestion(ques._id));
        dispatch(fetchAllQuestion());
        navigate('/questions')
    }

    const handleUpVote = async (e) => {
        await dispatch(voteQuestion({ id: ques._id, value: "upVote" }))
        dispatch(fetchAllQuestion())
    }
    const handleDownVote = async (e) => {
        await dispatch(voteQuestion({ id: ques._id, value: "downVote" }))
        dispatch(fetchAllQuestion())
    }

    return (
        <section className={styles['ques-details-container']}>
            <h1>{ques.questionTitle} </h1>
            <div className={styles['ques-details-container-2']}>
                <div className={styles.quesVotes}>
                    <i onClick={handleUpVote}><BiSolidUpArrow /></i>
                    <p>{ques.upVote.length - ques.downVote.length}</p>
                    <i onClick={handleDownVote}><BiSolidDownArrow /></i>
                </div>
                <div style={{ width: "100%" }}>
                    <p className={styles.quesBody}>{ques.questionBody}</p>
                    <div className={styles['ques-details-tags']}>
                        {ques.questionTags.map(tag => (
                            <p key={tag}>{tag}</p>
                        ))}
                    </div>

                    <div className={styles['ques-action-user']}>
                        <div>
                            <button onClick={handleShare}>Share</button>
                            {
                                (user?.data?._id === ques.userId) &&
                                <button onClick={handleDelete} >Delete</button>
                            }
                        </div>
                        <div>
                            <p>asked {moment(ques.askedOn).fromNow()}</p>
                            <Link to={`/users/${ques.userId}`} className={styles.userLink} style={{ color: "#0086d8" }}>
                                <Avatar avatarStyle={{ backgroundColor: "orange" }}>{ques.userPosted.charAt(0)}  </Avatar>
                                <div className="user-ask"> {ques.userPosted} </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default QuestionBody;