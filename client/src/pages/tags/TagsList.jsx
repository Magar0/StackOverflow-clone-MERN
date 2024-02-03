import { useSelector } from "react-redux";
import styles from "./tags.module.css";

const TagsList = ({ tag }) => {

    const theme = useSelector(state => state.theme)
    console.log(theme)
    return (
        <>
            <div className={`${styles.tag} ${theme === "night" ? styles.night : null}`}>
                <h5>{tag.tagName}</h5>
                <p>{tag.tagDesc}</p>
            </div>
        </>
    )
}

export default TagsList;