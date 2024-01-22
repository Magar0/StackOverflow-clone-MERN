import '../../App.css'
import LeftSidebar from '../../component/leftSidebar/LeftSidebar';
import HomeMainbar from '../../component/homeMainbar/HomeMainbar';
import RightSidebar from '../../component/rightSidebar/RightSidebar';

const Questions = () => {

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <HomeMainbar />
                <RightSidebar />
            </div>
        </div>
    )
}

export default Questions;