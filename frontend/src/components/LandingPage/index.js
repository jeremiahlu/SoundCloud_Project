import "./landingPage.css";
// import { Link } from 'react-router-dom';
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import SignupFormPage from "../SignupFormModal/SignUpForm";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import Footer from "../Footer";

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedSession = useSelector((state) => state.session.user);

  const logOut = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };
  return (
    <>
      <div className="landingPage-container">
        <div className="mainImage-container">
          <div className="mainImageText-container">
            <img
              className="discover-image"
              src="https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_a@2x-cc048a7f.jpg"
              width="100%"
            />
            <div className="discover-text">
              Discover more with SoundStrata Plus+
              <div className="sc-plus-text">
                SoundStrata Plus+ lets you listen offline, ad-free with over 150
                million tracks - and growing.
              </div>
            </div>
            <div className="landingPage-button-div">
              {/* <button className='learn-more-button'>
                <a href='https://checkout.soundcloud.com/go?ref=t1033' className='learn-more-link'>
                Learn More
                </a>
            </button> */}
              <button className="trial-button">
                <a href="/songs" className="trial-link">
                  Try the SoundStrata experience
                </a>
                {/* <SignUpFormModal /> */}
              </button>
            </div>
            <div className="trending-container">
              <div className="trending-text">
                Hear what's trending for free in the SoundStrata community
              </div>
            </div>
          </div>
          {/* <img className="discover-image" src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_a@2x-cc048a7f.jpg' width='100%'/>  */}
        </div>

        <div className="download-container">
          <div className="download-image-div">
            <img
              className="download-main-image"
              src="https://ventsmagazine.com/wp-content/uploads/2019/11/cloudrap-1-750x350.jpeg"
              width="1%"
            />

            <div className="download-buttons-container">
              <div className="text-div">
                <div className="skys-the-limit-text">
                  Take your music wherever you go. The sky's the limit.
                </div>
              </div>

              <div className="download-button-div">
                <div className="download-button">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=us"
                    target="_blank"
                  >
                    <img
                      className="appStore-img"
                      src="https://a-v2.sndcdn.com/assets/images/google_play_badge@en_2x-ad41a4d7.png"
                      to="https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=us"
                    />
                  </a>
                </div>

                <div className="download-button">
                  <a
                    href="https://apps.apple.com/us/app/soundcloud/id336353151"
                    target="_blank"
                  >
                    <img
                      className="appStore-img"
                      src="https://a-v2.sndcdn.com/assets/images/appstore_badge@en_2x-5a6e21e0.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="never-stop-listening-container">
          <div className="never-stop-listening-div">
            <img
              className="never-stop-listening-img"
              src="https://a-v2.sndcdn.com/assets/images/never_stop_listening@2x-ae7903ca.jpg"
            />

            <div className="never-stop-listening-text">
              <p className="nsl-text">Never stop listening</p>
              <img
                className="nsl-rainbow-line"
                src="https://app-name-soundcloud.herokuapp.com/images/bar.jpeg"
              />
              <p className="nsl-text-secondary">
                SoundStrata is available on Web, iOs, Android, Sonos,
                Chromecast, and Xbox One.
              </p>
            </div>
          </div>
        </div>

        <div className="tfl-text-container">
          <div className="tfl-text">
            <p className="tfl">Thanks for listening. Now join in.</p>
            <p className="tfl-2">
              Save tracks, follow artists and build playlists. All for free.
            </p>
            {!loggedSession ? (
              <div className="tfl-buttons">
                {/* <button className='tfl-button-createAcc'> */}
                {/* <p className='createAccText'>
                    Create Account
                  </p> */}
                <SignUpFormModal className="tfl-button-createAcc" />
                {/* </button> */}
                <div className="tfl-signin-div">
                  <p className="tfl-text-three"> Already have an account? </p>
                  {/* <button className='tfl-button-signIn'>
                    Sign in
                  </button> */}
                  <LoginFormModal className="tfl-button-signIn" />
                </div>
              </div>
            ) : // <div className='landingPage-logout' onClick={logOut}>
            //   Log out
            //   </div>
            null}
            <button onClick={topFunction} className="scrollToTop">
              <i className="fa-sharp fa-solid fa-chevron-up"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
