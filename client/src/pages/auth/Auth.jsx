import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './auth.css';
import icon from '../../assets/icon.png';
import AboutAuth from './AboutAuth';
import { login, signup } from '../../store/slices/authSlice';
import LeftSidebar from '../../component/leftSidebar/LeftSidebar';


const Auth = () => {

    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { error, data } = useSelector((state) => state.auth);

    const handleSwitch = () => setIsSignup(!isSignup)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return alert('Enter email and password')
        }
        if (isSignup) {
            if (!name) {
                return alert("Enter a Name")
            }
            await dispatch(signup({ name, email, password }))
        } else {
            await dispatch(login({ email, password }))
        }
    }

    useEffect(() => {
        if (error) {
            setShowError(error)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
        }
        if (data) {
            navigate('/')
        }
    }, [data, error])

    return (
        <>
            <div className="auth-leftSideBar ">
                <LeftSidebar />
            </div>
            <section className='auth-section'>

                {isSignup && <AboutAuth />}

                <div className='auth-container-2'>
                    {!isSignup &&
                        <img src={icon} alt="icon" height='40px' className='login-logo' />
                    }
                    <form onSubmit={handleSubmit}>
                        {
                            isSignup && (
                                <label htmlFor="name">
                                    <h4>Display Name</h4>
                                    <input type="text" id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                                </label>
                            )
                        }
                        <label htmlFor="email">
                            <h4>Email</h4>
                            <input type="email" id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>

                        <div>
                            <label htmlFor="password">
                                <div className={isSignup ? null : "flex-between"}>
                                    <h4>Password:</h4>
                                    {!isSignup && <Link to='/' className='frgt-psd'>Forgot Password?</Link>}
                                </div>
                                <input type="password" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>

                            {isSignup && <p className='light-color'>Passwords must contain at least eight characters,<br /> including at least 1 letter and 1 number. </p>}
                        </div>

                        {isSignup &&
                            <div className='checkbox'>
                                <input type="checkbox" id='check' />
                                <label htmlFor="check">Opt-in to receive occasional product<br /> updates, user research invitations,<br />company announcements, and digests.</label>
                            </div>
                        }

                        {/* display error */}
                        {(showError && error.message) && <p className='error'>{error.message}</p>}
                        {(showError && !error.message) && <p className='error'>Something went wrong</p>}

                        <button type='submit' className='auth-btn'>{isSignup ? 'Sign Up' : 'Log in'} </button>
                        {
                            isSignup && <p className='light-color'>By clicking “Sign up”, you agree to our <a href='#'>terms of<br />service</a> and acknowledge that you have read and<br />understand our <a href='#'>privacy policy</a> and <a href='#'>code of conduct</a>.</p>
                        }
                    </form>

                    <p>
                        {isSignup ? 'already have an account?' : "Don't have an account?"}
                        <button className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? 'Log in' : 'Sign up'} </button>
                    </p>

                </div>

            </section>
        </>
    )
}

export default Auth;