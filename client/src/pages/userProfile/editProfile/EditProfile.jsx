import { useState } from 'react'
import styles from './editProfile.module.css'
import { useDispatch } from 'react-redux'
import { deleteUser, getAllUsers, updateProfile } from '../../../store/slices/userSlice'

const EditProfile = ({ user, cancelEditing }) => {

    const [switchEdit, setSwitchEdit] = useState("profile")
    const [name, setName] = useState(user?.name)
    const [about, setAbout] = useState(user?.about)
    const [tags, setTags] = useState(user?.tags?.join(" "))
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();

    function trimWithOneSpace(str) {
        return str.replace(/^\s+|\s+$/g, "") // Trim leading and trailing spaces
            .replace(/\s{2,}/g, " "); // Replace consecutive spaces with single space
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataToBeUpdated;
        if (switchEdit === "profile") {
            dataToBeUpdated = {
                id: user._id,
                name,
                tags: [...new Set(trimWithOneSpace(tags).split(" "))]
            }
        } else {
            dataToBeUpdated = { id: user._id, password }
        }

        await dispatch(updateProfile({ ...dataToBeUpdated }));
        cancelEditing();
        await dispatch(getAllUsers());
    }

    const handleDelete = async () => {
        await dispatch(deleteUser())
    }

    return (
        <>
            <div className={styles.editForm}>
                <h1>Edit Your Profile</h1>
                <div className={styles.switchBtn}>
                    <h2 onClick={() => setSwitchEdit("profile")}>Public information</h2>
                    <h2 onClick={() => setSwitchEdit("setting")}>Setting</h2>
                </div>
                <form onSubmit={handleSubmit} className={styles.editProfileForm}>
                    {
                        switchEdit === "profile" &&
                        <>
                            <label htmlFor="name">
                                <h3>Display Name</h3>
                                <input type="text" value={name} id='name' onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label htmlFor="about">
                                <h3>About Me</h3>
                                <textarea type="text" id='about' rows={6} value={about} onChange={(e) => setAbout(e.target.value)} />
                            </label>
                            <label htmlFor="tags">
                                <h3>Watched Tags</h3>
                                <p>Add tags separated by a space</p>
                                <input type="text" id='tags' value={tags} onChange={(e) => setTags(e.target.value)} />
                            </label>
                        </>
                    }
                    {
                        switchEdit === "setting" &&
                        <>
                            <label htmlFor="password">
                                <h3>Change Password</h3>
                                <input type="password" value={password} id='password' onChange={(e) => setPassword(e.target.value)} />
                            </label>

                        </>
                    }
                    <br />
                    <button type='submit' className={styles.submitBtn}>Save Profile</button>
                    <button className={styles.cancelBtn} onClick={() => cancelEditing()}>Cancel</button>

                    {/* delete acount button */}
                    {/* {
                        switchEdit === "setting" &&
                        <>
                            <br />
                            <button className={styles.deleteBtn} onClick={handleDelete}>Delete Account</button>
                        </>
                    } */}
                </form>

            </div>
        </>
    )
}

export default EditProfile