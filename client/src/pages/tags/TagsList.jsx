import styles from "./tags.module.css";

const TagsList = ({ tag }) => {
    return (
        <>
            <div className={styles.tag}>
                <h5>{tag.tagName}</h5>
                <p>{tag.tagDesc}</p>
            </div>
        </>
    )
}

export default TagsList;