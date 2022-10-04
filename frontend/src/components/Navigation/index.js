import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';

const Navigation = ({ isLoaded }) => {
  const loggedSession = useSelector((state) => (state.session.user));
//   let sessionLinks;
//   if (loggedSession) {
//     sessionLinks = (
//       <ProfileButton user={loggedSession} />
//     );
//   } else {
//     sessionLinks = (
//       <>
//         <NavLink className='signupLink' to='users/signup'> 
//         Sign Up
//         </NavLink> 
//         <NavLink className='loginLink' to='users/login'>
//         Log In
//         </NavLink>
//       </>
//     )
//   }
//   return (
//       <ul> 
//         <li>
//           <NavLink className='homeLink' exact to='/'>
//           <i class="fa-solid fa-house-chimney"></i>
//           {isLoaded && sessionLinks}
//           </NavLink>
//         </li>
//       </ul>
//   );


  return (
    <nav className='navbar'>
      <ul>

        <li>
          <button className='homeButton'>
          <Link className='homeLink' to='/'>  
            {/* <i className="fa-solid fa-house-chimney"></i> */}
            {isLoaded} 
            {/* <h1 className='rhapsodyLogo'>
              Rhapsody  
            </h1> */}
            <img className='rhapsodyLogo' src='../images/logo.png' alt='logo'/>
           </Link>
          </button>
        </li>

        <li>
          {
            loggedSession 
              ?
              <div className='signedin'>
                {
                  <div className='navtab'>
                  <Link className='explore' to='/songs'>
                    Explore
                  </Link>

                  <Link
                  className='upload' 
                  to='/songs/new'>
                    Upload
                  </Link>
                  </div>
                }
                <ProfileButton user={loggedSession} />
              </div>
              :
                <div className='login-signup-div'>
                <LoginFormModal />
                  <SignUpFormModal />
                {/* <div className='loginSignup'>
                <NavLink className='signupLink' to='/users/signup'> 
                  Sign Up
                  </NavLink> 
                </div> */}
              </div>
              
              //   <NavLink className='loginLink' to='/users/login'>
              //   Log In
              //   </NavLink>
          }  
        </li>

      </ul>
    </nav>
  )
}

export default Navigation;