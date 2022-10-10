import './footer.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const Footer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logOut = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
    history.push('/')
  }

  const loggedSession = useSelector((state) => (state.session.user));

  return (
    <div className='footer-container'>
      <div className='footer-content'>

      <div className='get-started'>
        Jump in and experience what millions are talking about. <Link to='/'>Get Started </Link>
      </div>


      <div className='about-me'>
          <p>About</p>

          <a href="https://www.linkedin.com/in/jeremiah-lu/" target='_blank'>
              LinkedIn
            </a>
          <a href="https://github.com/jeremiahlu" target='_blank'>Github</a>
      <div className='session-user'>
        {loggedSession && (
          <div className='landingPage-logout' onClick={logOut}>
                Log out
            </div>
        )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Footer;