
import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useHistory} from 'react-router-dom';

const ProfileButton = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ showMenu, setShowMenu ] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => setShowMenu(false)

    document.addEventListener('click', closeMenu);

    return () => 
    document.removeEventListener('click', closeMenu)
    
  }, [showMenu])

  const logOut = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
    history.push('/')
  }
  
  return(
    
     <div className='profile'>
      <button className='profileButton' onClick={openMenu}>
        {/* <i className="fa-solid fa-user"></i> */}
        <div className='userInitials'>
          {user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
        </div>
        <h2 className='profile-text'>
          {user.firstName}
        </h2>
        <i className="fas fa-sort-down"></i>
      </button>
      { showMenu && (
        <div className='dropDownMenu'>
          <div className='userInfo'>
            {user.username}
          </div>

          <div className='userInfo'>
            {user.email}
          </div>

          <div className='userInfo'>
          <Link to={`/users/${user.id}/songs`} className='links'> 
            Your Tracks
          </Link>
          </div>  
        
          <div className='userInfo'>
          <Link to={`/users/${user.id}/playlists`} className='links'>
            Your Playlists
          </Link>
          </div>

          <div className='userInfo'>
          <Link to={`/users/${user.id}/albums`} className='links'>
            Your Albums
          </Link>
          </div>

          <div className='logOutButton userInfo' onClick={logOut}>
          Log Out  
          <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>
      )}
   </div> 
   
  )
}

export default ProfileButton;
