import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { FaBirthdayCake } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import moment from "moment";

import LeftSidebar from "../../component/leftSidebar/LeftSidebar";
import styles from './userProfile.module.css'
import Avatar from "../../component/avatar/Avatar";
import EditProfile from "./editProfile/EditProfile";
import ProfileBio from "./prfileBio/ProfileBio";
import { getAllUsers } from "../../store/slices/userSlice";


const UserProfile = () => {

    const [editing, setEditing] = useState(false);
    const { id } = useParams();
    const currentUser = useSelector(state => state.currentUser)
    const users = useSelector(state => state.users.data?.data);
    const dispatch = useDispatch()

    const currentProfile = users?.filter((user) => user._id === id)[0];
    const cancelEditing = () => setEditing(false)

    let avatarStyle = {
        backgroundColor: "purple",
        color: "white",
        fontSize: "50px",
        px: "50px",
        py: "30px",
    }

    if (window.innerWidth < 576) {
        avatarStyle = {
            backgroundColor: "purple",
            color: "white",
            fontSize: "40px",
            px: "30px",
            py: "15px",
        }
    }

    useEffect(() => {
        if (!users) {
            dispatch(getAllUsers())
        }
    }, [dispatch])

    return (
        <>
            <div className="home-container-1">
                <LeftSidebar />
                {
                    currentProfile &&
                    <div className="home-container-2">
                        <div className={styles.user_details_container}>
                            <div className={styles.userDetails}>
                                <Avatar avatarStyle={avatarStyle} >
                                    {currentProfile?.name.charAt(0).toUpperCase()}
                                </Avatar>

                                <div className={styles.userName}>
                                    <h1>{currentProfile?.name}</h1>
                                    <div>
                                        <i><FaBirthdayCake /></i>
                                        <p>Joined {moment(currentProfile?.joinedOn).fromNow()} </p>
                                    </div>
                                </div>
                            </div>

                            {
                                (currentProfile?._id === currentUser?.data._id) &&
                                <div className={styles.editBtn} onClick={() => setEditing(!editing)}>
                                    <i>
                                        <RiPencilFill />
                                    </i>
                                    <p>Edit Profile</p>
                                </div>
                            }

                        </div>

                        {editing ? <EditProfile user={currentProfile} cancelEditing={cancelEditing} /> : <ProfileBio userDetails={currentProfile} />}

                    </div>
                }
            </div>
        </>
    )
}

export default UserProfile;