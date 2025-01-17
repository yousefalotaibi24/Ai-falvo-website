import React from "react";
import { NavLink } from "react-router";
import "../CSS/style.css";
function Nav() {
    return (
        <div>
            <nav className='nav'>
                <div className='logo'>
                    <div style={{ color: 'white', fontSize: '2rem' }}>Flavo</div>
                </div>
                <div className='nav-items'>
                    <NavLink to='/home'>Home</NavLink>
                    <NavLink to='/cuisines'>Cuisines</NavLink>
                    <NavLink to='/restaurants'>Restaurants</NavLink>
                    <NavLink to='/dishes'>Dishes</NavLink>
                    <NavLink to='/profile'>Profile</NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Nav;