import { useLocation, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import copy from "copy-to-clipboard";

import QuestionBody from "./details/questionBody/questionBody";
import PostAnswer from "./details/postAnswer/PostAnswer";
import DisplayAns from "./details/displayAns/DisplayAns";


const QuestionDetails = () => {

    const { id } = useParams();

    const currentUser = useSelector(state => state.currentUser);
    const questionDetails = useSelector(state => state.questions.data?.filter(question => question._id === id));
    const { loading, error } = useSelector(state => state.questions);
    const location = useLocation();

    const url = process.env.REACT_APP_SHARE_URL || "http://localhost:3000"

    const handleShare = () => {
        const fullUrl = url + location.pathname;
        copy(fullUrl);
        alert('copied url: "' + fullUrl + '"')
    }

    return (
        <div className='ques-details-page'>
            {loading && <h1>Loading...</h1>}
            {error && <h1>Error Loading...</h1>}
            {(questionDetails && !questionDetails?.length) && <h1>No question found...</h1>}
            {
                (questionDetails && (questionDetails?.length > 0)) &&
                <div>
                    <QuestionBody ques={questionDetails[0]} user={currentUser} handleShare={handleShare} />
                    {
                        (questionDetails[0].noOfAnswers > 0) && (
                            <section>
                                <h3>{questionDetails[0].noOfAnswers} answers</h3>
                                <DisplayAns ques={questionDetails[0]} user={currentUser} handleShare={handleShare} />
                            </section>
                        )
                    }
                    <PostAnswer ques={questionDetails[0]} user={currentUser} questionId={id} />
                </div>

            }

        </div>
    )
}

export default QuestionDetails