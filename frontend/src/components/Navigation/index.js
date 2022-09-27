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
          <Link className='homeLink' exact to='/'>  
            <i className="fa-solid fa-house-chimney"></i>
            {isLoaded}
           </Link>
        </li>

        <li>
          {
            loggedSession 
              ?
              <ProfileButton user={loggedSession} />
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