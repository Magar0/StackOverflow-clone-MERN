import { Link, useLocation, useNavigate } from 'react-router-dom';
import Questions from './Questions';
import "./homeMainbar.css"
import { useSelector } from 'react-redux';

const HomeMainbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const user = 1;

    const { data: questionList, loading, error } = useSelector(state => state.questions)

    const checkAuth = () => {
        if (user === null) {
            alert('Log in to ask a question.')
            navigate('/auth');
        } else {
            navigate('/askquestion')
        }
    }

    return (
        <>
            <div className="main-bar">
                <div className="main-bar-header">
                    {
                        location.pathname === '/' ? < h1 > Top Questions</h1> : <h1>All Questions</h1>
                    }
                    <button className='ask-btn' onClick={checkAuth}>Ask Question</button>
                </div>
                <div>
                    {loading && <h1>Loading...</h1>}
                    {error && <h1>Error loading...</h1>}
                    {(questionList && !questionList?.length) && <h1>No Question Found...</h1>}
                    {
                        questionList?.length > 0 &&
                        <>
                            <p>{questionList.length} questions</p>
                            {questionList.map(question => {
                                return <Questions question={question} key={question._id} />
                            })}
                        </>
                    }

                </div>
            </div >

        </>
    )
}

export default HomeMainbar;