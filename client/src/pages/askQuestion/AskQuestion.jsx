import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from '../../component/spinner/Spinner';

import "./askQuestion.css"
import { askQuestions, fetchAllQuestion } from "../../store/slices/questionSlice";
import LeftSidebar from "../../component/leftSidebar/LeftSidebar";

const AskQuestion = () => {

    const [showError, setShowError] = useState(false)
    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')
    const navigate = useNavigate()
    const dispacth = useDispatch();
    const User = useSelector(state => state.currentUser)
    const { success, loading, error } = useSelector(state => state.questions)

    function trimWithOneSpace(str) {
        return str.replace(/^\s+|\s+$/g, "") // Trim leading and trailing spaces
            .replace(/\s{2,}/g, " "); // Replace consecutive spaces with single space
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (User) {
            await dispacth(askQuestions({
                questionTitle,
                questionBody,
                questionTags: [...new Set(trimWithOneSpace(questionTags).split(" "))],
                userPosted: User.data.name
            }));
            await dispacth(fetchAllQuestion())
            navigate('/')
        } else {
            alert("Login to ask question")
            navigate('/auth')
        }
    }

    // const handleNavigation = async () => {
    //     if (success) {
    //         // await dispacth(fetchAllQuestion())
    //         // // navigate('/')
    //     }
    // }
    useEffect(() => {
        if (error) {
            setShowError(error?.message)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
        }
    }, [error])

    // useEffect(() => {
    //     handleNavigation()
    // }, [success])

    return (
        <>
            <div className="askQuestion-leftSideBar ">
                <LeftSidebar />
            </div>
            <div className="ask-ques">
                <div className="ask-ques-container">
                    <h1>Ask a public Questions</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="ask-form-container">

                            <label htmlFor="title">
                                <h4>Title</h4>
                                <p>Be specific and imagine you're asking a question to another person.</p>
                                <input type="text" name="title" id="title" placeholder="e.g. Is there an R function for finding the index of an element in a factor?" onChange={e => setQuestionTitle(e.target.value)} value={questionTitle} required />
                            </label>

                            <label htmlFor="body">
                                <h4>Body</h4>
                                <p>Include all the information someone would need to answer your question.</p>
                                <textarea type="text" name="body" id="body" placeholder="write the information" rows={5} onChange={e => setQuestionBody(e.target.value)} value={questionBody} required />
                            </label>

                            <label htmlFor="tags">
                                <h4>Tags</h4>
                                <p>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
                                <input type="text" name="tags" id="tags" placeholder="e.g. xml typescript wordpress" onChange={e => setQuestionTags(e.target.value)} value={questionTags} required />
                            </label>

                        </div>
                        {
                            showError &&
                            < p className="error"> {showError} </p>
                        }
                        <input type="submit" value="Post Your question" className="review-btn" />
                        {
                            loading && <i className="spinner-auth"><Spinner /></i>
                        }
                    </form>
                </div>
            </div >
        </>
    )
}

export default AskQuestion;