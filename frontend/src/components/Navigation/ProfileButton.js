
import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';



const ProfileButton = ({ user }) => {
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
  }

  return(
    <>
      <button className='profileButton' onClick={openMenu}>
        <i className="fa-solid fa-user"></i>
      </button>
      { showMenu && (
        <div className='dropDownMenu'>
          <div>
            {user.username}
          </div>
          <div>
            {user.email}
          </div>

          <div className='logOutButton' onClick={logOut}>
          <i className="fa-solid fa-person-to-door"></i>
          {/* logout */}
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileButton;
