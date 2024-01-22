import styles from './tags.module.css'
import LeftSidebar from '../../component/leftSidebar/LeftSidebar'
import TagsList from './TagsList.jsx'
import { tagsList } from './tagsList.js'
import '../../App.css'

const Tags = () => {

    return (
        <>
            <section className="home-container-1">
                <LeftSidebar />
                <div className={`home-container-2 ${styles.tags_container}`}>
                    <h1>Tags</h1>
                    <p >
                        A tag is a keyword or label that categorizes your question with other, similar questions.
                    </p>
                    <p >
                        Using the right tags makes it easier for others to find and answer your question.
                    </p>

                    <div className={styles.tags_list}>
                        {tagsList.map((tag, index) => (
                            <TagsList tag={tag} key={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tags