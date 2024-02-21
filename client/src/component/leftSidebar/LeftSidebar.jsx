import React from 'react'
import { NavLink } from 'react-router-dom';
import { IoMdGlobe } from "react-icons/io";
import './leftSidebar.css'
import { useDispatch, useSelector } from 'react-redux';
import { setMenuBar } from '../../store/slices/menuBar';

const LeftSidebar = () => {

    const dispatch = useDispatch()
    const menuBar = useSelector(state => state.menuBar)

    const handleClick = () => {
        dispatch(setMenuBar())
    }

    return (
        <div className={`left-sidebar ${menuBar ? "active" : null}`}>
            <nav className='side-nav'>
                <NavLink to='/' className='side-nav-links' activeclass='active' onClick={handleClick}>Home</NavLink >
                <NavLink to='/subscription' className='side-nav-links' activeclass='active' onClick={handleClick}>Subscription</NavLink >

                <div className='side-nav-div'>
                    <h5>PUBLIC</h5>

                    <div>
                        <NavLink to='/questions' className='side-nav-links' onClick={handleClick}>
                            <i><IoMdGlobe /></i>
                            <p>Questions</p>
                        </NavLink>

                        <NavLink to='/tags' className='side-nav-links' onClick={handleClick}>Tags</NavLink >
                        <NavLink to='/users' className='side-nav-links' onClick={handleClick}>Users</NavLink >

                    </div>
                </div>

            </nav>

        </div>
    )
}

export default LeftSidebar;