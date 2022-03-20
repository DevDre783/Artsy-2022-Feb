// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { FaSmile } from "react-icons/fa";
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { FaUserAlt } from "react-icons/fa";
import "./Navigation.css"
// import "../../public/profile-pic.jpeg"

function ProfileButton() {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async () => {
    await dispatch(sessionActions.logout());

    history.push('/');
  };

  return (
    <>
      {/* {user ? null : */}
      <button className="profile-menu" onClick={openMenu}>
        <i className="fas fa-bars" />
        {/* <i className="fas fa-user-circle" /> */}
        {/* <img className='profile__img' src='https://www.pngitem.com/pimgs/m/264-2647677_avatar-icon-human-user-avatar-svg-hd-png.png'></img> */}
        <FaUserAlt className="profile__img" />
      </button>
      {/* } */}
      {showMenu && (
        <ul className="profile-dropdown">
          <div className="username__container">
            <li className="Dd-username">Welcome, {user?.username}</li>
          </div>
          <div className="email__container">
            <li className="Dd-email">{user?.email}</li>
          </div>
          <div className="my__profile__container" >
            <FaSmile className="my__profile__smiley"/>
            <NavLink to={'/my-profile'} className="my__profile"> My Profile</NavLink>
          </div>
          <button className="logout-btn" onClick={handleLogout}>logout</button>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
