import React from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from "react";
import * as sessionActions from '../../store/session';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPalette } from "react-icons/fa";



function Navbar({ isLoaded }) {
  const user = useSelector(state => state.session.user)
  const location = useLocation()
  const path = location.pathname

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = async (e) => {
      await dispatch(sessionActions.login('demo@aa.io', 'password'))
      history.push('/browse')
  }

  const handleLogout = async () => {
    await dispatch(sessionActions.logout());

    history.push('/');
  };


  return (
    <nav className='navbar'>
      {user ? null :
      <>
        <div className='logo__container'>
          <Link to={`/`}><h1>Artsy</h1></Link><FaPalette style={{color: "red"}}/>
        </div>
        <div className=''>

        </div>
        <div className='right__container'>
          <div>
            <Link to={"/login"}><button className='signin__btn'>Sign In</button></Link><Link to={'/browse'}><button onClick={handleClick} className='signin__btn'>Demo</button></Link>
          </div>
          <div className='right-nav'>
            <div className='profile-icon'>{isLoaded}</div>
          </div>
        </div>
      </>
      }
      {!user ? null :
        <>
          <div className='logo__container'>
            <Link to={`/browse`}><h1>Artsy</h1></Link><FaPalette className='palette__icon' style={{color: "red"}}/>
          </div>
          <div className=''>
            <div>

            </div>
            <div className=''>

            </div>
            <div>

            </div>
          </div>
        </>
      }
        <div className='profile__icon'>
         {!user ? null : <div className='my__lists__tab'><NavLink to={`/listing-form`} style={{color: "red"}}>Share Your Art</NavLink></div>}
         {!user ? null :<ProfileButton />}
        </div>
    </nav>
  );
}

export default Navbar;
