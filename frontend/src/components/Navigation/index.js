import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';
import soundcloudLogo from './soundcloud-icon-copy.png';
const Navigation = ({ isLoaded }) => {
  // console.log(logo)
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
            {/* <img className='rhapsodyLogo' src={logo} alt='logo'/> */}
            {/* <img src='https://cdn-icons-png.flaticon.com/512/48/48967.png'/> */}
            <img src={soundcloudLogo}/>
           </Link>
          </button>
        </li>

        <li>
          {
            loggedSession 
              ?
              <div className='navtab'>
                <div>
                  {
                    <div className='exploreUpload-links'>
                    <Link className='navtab-albums' to='/albums'>
                      Albums
                    </Link>
                    
                    <Link className='explore' to='/songs'>
                      Explore
                    </Link>

                    <Link className='upload' to='/songs/new'>
                      Upload
                    </Link>
                    </div>
                  }
                </div>

                <div className='profileButton-div'>
                  <ProfileButton user={loggedSession} />
                </div>
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