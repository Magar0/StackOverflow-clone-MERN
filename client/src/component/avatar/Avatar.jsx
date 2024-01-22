
const Avatar = ({ children, avatarStyle }) => {


    const { backgroundColor, py = "5px", px = "8px", color, borderRadius = "5px", fontSize = "1rem", cursor } = avatarStyle

    const style = {
        backgroundColor: backgroundColor || "lightgreen",
        padding: `${py} ${px} `,
        color: color || "black",
        cursor: cursor || "pointer",
        textAlign: "center",
        borderRadius,
        fontSize,
    }

    return (
        <>
            <div style={style}>{children}</div>
        </>
    )
}

export default Avatar