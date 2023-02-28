import { React, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./navigation.css";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import soundcloudLogo from "./soundcloud-icon-copy.png";
import Search from "../Search";
import { getSongs } from "../../store/songs";

const Navigation = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const loggedSession = useSelector((state) => state.session.user);

  useEffect(() => {
    const fetchSongs = async () => {
      await dispatch(getSongs());
    };
    fetchSongs();
  }, []);

  const songState = useSelector((state) => state.songs);
  const songs = Object.values(songState);

  return (
    <nav className="navbar">
      <ul>
        {/* <li> */}
        <button className="homeButton">
          <Link className="homeLink" to="/">
            {/* <i className="fa-solid fa-house-chimney"></i> */}
            {isLoaded}
            {/* <h1 className='rhapsodyLogo'>
              Rhapsody  
            </h1> */}
            {/* <img className='rhapsodyLogo' src={logo} alt='logo'/> */}
            {/* <img src='https://cdn-icons-png.flaticon.com/512/48/48967.png'/> */}
            <img src={soundcloudLogo} />
          </Link>
        </button>
        {/* </li> */}

        <div>
          {
            loggedSession ? (
              <div className="navtab">
                <li className="navTabDiv">
                  {
                    <div className="exploreUpload-links">
                      <Search className="searchFunction" />
                      <Link
                        className={activeTab === 0 ? "active" : "albumsTab"}
                        onClick={() => handleTabClick(0)}
                        to="/albums"
                      >
                        Albums
                      </Link>

                      <Link
                        className={activeTab === 1 ? "active" : "songsTab"}
                        onClick={() => handleTabClick(1)}
                        to="/songs"
                      >
                        Explore
                      </Link>

                      <Link
                        className={activeTab === 2 ? "active" : "uploadTab"}
                        onClick={() => handleTabClick(2)}
                        to="/songs/new"
                      >
                        Upload
                      </Link>
                    </div>
                  }
                </li>

                <div className="profileButton-div">
                  <ProfileButton user={loggedSession} />
                </div>
              </div>
            ) : (
              <div className="login-signup-div">
                <LoginFormModal />
                <SignUpFormModal />
                {/* <div className='loginSignup'>
                <NavLink className='signupLink' to='/users/signup'> 
                  Sign Up
                  </NavLink> 
                </div> */}
              </div>
            )

            //   <NavLink className='loginLink' to='/users/login'>
            //   Log In
            //   </NavLink>
          }
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
