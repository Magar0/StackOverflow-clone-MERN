import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { MdNightlight, MdOutlineWbSunny } from "react-icons/md";

import './Navbar.css'
import Avatar from "../avatar/Avatar";
import Button from "../button/Button";
import logo from '../../assets/stackOverflow(logo).png'
import { logout } from "../../store/slices/authSlice";
import { setCurrentUser } from "../../store/slices/currentUserSlice";


const Navbar = ({ toggleTheme }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.currentUser)
    const theme = useSelector(state => state.theme)
    const changeInState = useSelector(state => state)


    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        dispatch(setCurrentUser(null))
        navigate("/");

    }

    const avatarStyle = {
        backgroundColor: '#009dff',
        py: "7px",
        px: "10px",
        borderRadius: "50%",
        color: 'white',
        fontSize: "16px"
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
                alert("Session timeout Log in again");
                navigate('/auth')
                console.log("Logged out");
            }
        }
    }, [changeInState])

    return (
        <>
            <nav className={`main-nav theme-nav-${theme}`}>
                <div className="navbar">
                    <Link to='/' className="nav-item nav-logo">
                        <img src={logo} height={45} alt='logo' />
                    </Link>
                    <Link to='/' className="nav nav-item nav-btn">About</Link>
                    <Link to='/' className="nav-item nav-btn">Products</Link>
                    <Link to='/' className="nav-item nav-btn">For Teams</Link>

                    <form action="">
                        <input type="text" placeholder="Search..." />
                        <FaSearch className="search-icon" />
                    </form>

                    {user === null ?
                        <Link to='/auth' className="nav-item nav-link"> Log In</Link> :
                        <>
                            <Link to={`/users/${user?.data?._id}`} className="nav-avatar"> <Avatar avatarStyle={avatarStyle}>{user?.data?.name.charAt(0).toUpperCase()}</Avatar> </Link>
                            <button className="nav-item nav-link" onClick={handleLogout}>Log Out</button>
                        </>
                    }

                    <div className="toggle-theme-icon">
                        <i><MdNightlight onClick={() => toggleTheme("night")} /></i>
                        <i><MdOutlineWbSunny onClick={() => toggleTheme("day")} /></i>
                        <i onClick={() => toggleTheme(false)}>Auto</i>
                    </div>

                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar