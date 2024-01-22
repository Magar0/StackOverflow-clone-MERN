import Widget from './Widget';
import WidgetTags from './WidgetTags';
import './rightSidebar.css'

const RightSidebar = () => {
    return (
        <aside className='right-sidebar'>
            <Widget />
            <WidgetTags />
        </aside>

    )
}

export default RightSidebar;