import { Link } from "react-router-dom"
import styles from './userCard.module.css'

const UserCard = ({ user }) => {
    return (
        <>
            <Link to={`/users/${user._id}`} className={styles.user_profile_link}>
                <h3>{user.name.charAt(0).toUpperCase()}</h3>
                <h5>{user.name}</h5>
            </Link>
        </>
    )
}

export default UserCard