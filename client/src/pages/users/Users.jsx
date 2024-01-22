import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LeftSidebar from '../../component/leftSidebar/LeftSidebar'
import { getAllUsers } from '../../store/slices/userSlice'
import UserCard from './UserCard'
import styles from './users.module.css'

const Users = () => {

    const users = useSelector(state => state.users)

    return (
        <>
            <div className="home-container-1">
                <LeftSidebar />
                <div className="home-container-2">
                    <h2 className={styles.title}>Users</h2>
                    <div className={styles.user_list_container}>
                        {users.loading && <h5>Loading....</h5>}
                        {users.error && <h5>Error Loading</h5>}
                        {
                            users.data?.data.map(user => (
                                <>
                                    <UserCard user={user} key={user._id} />
                                </>
                            ))
                        }
                    </div>

                </div>
            </div>


        </>
    )
}

export default Users