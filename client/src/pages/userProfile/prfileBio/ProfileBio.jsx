import styles from './profileBio.module.css'

const ProfileBio = ({ userDetails }) => {

    return (
        <div className={styles.bio}>
            <div>
                {
                    (userDetails?.tags?.length !== 0) &&
                    <>
                        <h4>Tags Watched</h4>
                        {userDetails.tags?.map((tag) => (
                            <p key={tag}>{tag}</p>
                        ))}
                    </>
                }
                {
                    (userDetails?.tags?.length === 0) && <p>0 tags watched</p>
                }
            </div>
            <div>
                {userDetails?.about ? (
                    <>
                        <h4>About</h4>
                        <p>{userDetails.about}</p>
                    </>
                ) : (
                    <p>No bio found</p>
                )
                }
            </div>
        </div>
    )
}

export default ProfileBio;