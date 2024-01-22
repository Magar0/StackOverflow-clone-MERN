import React from 'react'
import { NavLink } from 'react-router-dom';
import { IoMdGlobe } from "react-icons/io";
import './leftSidebar.css'

const LeftSidebar = () => {
    return (
        <div className='left-sidebar'>
            <nav className='side-nav'>
                <NavLink to='/' className='side-nav-links' activeclass='active'>Home</NavLink >

                <div className='side-nav-div'>
                    <h5>PUBLIC</h5>

                    <div>
                        <NavLink to='/questions' className='side-nav-links'>
                            <i><IoMdGlobe /></i>
                            <p>Questions</p>
                        </NavLink>

                        <NavLink to='/tags' className='side-nav-links' >Tags</NavLink >
                        <NavLink to='/users' className='side-nav-links'>Users</NavLink >

                    </div>
                </div>

            </nav>

        </div>
    )
}

export default LeftSidebar;