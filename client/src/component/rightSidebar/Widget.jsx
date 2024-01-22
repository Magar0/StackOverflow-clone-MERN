import { FaPen } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { FaStackOverflow } from "react-icons/fa";

const Widget = () => {
    return (
        <div className='widget'>

            <h4>The Overflow Blog</h4>
            <div className="box">
                <div className="inner-box">
                    <i><FaPen /></i>
                    <div>
                        <p> From prompt attacks to data leaks, LLMs offer new capabilities and new threats
                        </p>
                        <p>sponsored post</p>
                    </div>
                </div>
            </div>


            <h4>Featured on Meta</h4>
            <div className="box">
                <div className="inner-box">
                    <i><CiChat1 /></i>
                    <p>Seeking feedback on tag colors update</p>
                </div>

                <div className="inner-box">
                    <i><CiChat1 /></i>
                    <p>Update to our Advertising Guidelines</p>
                </div>

                <div className="inner-box">
                    <i><FaStackOverflow /></i>
                    <p>Temporary policy: Generative AI (e.g., ChatGPT) is banned</p>
                </div>

                <div className="inner-box">
                    <i><FaStackOverflow /></i>
                    <p>Rule proposal: Duplicate closure to roll-up questions is no longer allowed</p>
                </div>
            </div>

            <h4>Hot Meta Posts</h4>
            <div className="box">
                <div className="inner-box">
                    <i>14</i>
                    <p>Enhancing the Custom Filter capability</p>
                </div>
            </div>


        </div>
    )
}

export default Widget;