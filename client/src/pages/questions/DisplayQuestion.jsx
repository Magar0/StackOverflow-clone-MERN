import LeftSidebar from '../../component/leftSidebar/LeftSidebar';
import RightSidebar from '../../component/rightSidebar/RightSidebar';
import '../../App.css'
import QuestionDetails from './QuestionDetails';

const DisplayQuestion = () => {
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <QuestionDetails />
                <RightSidebar />
            </div>
        </div>
    )
}

export default DisplayQuestion;