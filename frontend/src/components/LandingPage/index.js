import "./landingPage.css";
// import { Link } from 'react-router-dom';
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import SignupFormPage from "../SignupFormModal/SignUpForm";
import { useEffect, useState, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import * as sessionActions from "../../store/session";
import Footer from "../Footer";
import SongsIndexItem from "../Songs/SongsIndexItem";

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [scroll, setScroll] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const scrollRef = useRef(null);
  const scrollLeft = () => setScroll((scrollRef.current.scrollLeft -= 100));
  const scrollRight = () => setScroll((scrollRef.current.scrollRight += 100));
  // console.log(scrollRef, "0");

  const [scroll1, setScroll1] = useState(0);
  const [scrollWidth1, setScrollWidth1] = useState(0);
  const [clientWidth1, setClientWidth1] = useState(0);
  const scrollRef1 = useRef(null);
  const scrollLeft1 = () => setScroll1((scrollRef1.current.scrollLeft -= 100));
  const scrollRight1 = () =>
    setScroll1((scrollRef1.current.scrollRight += 100));
  // console.log(scrollRef1.current, "1");

  const [scroll2, setScroll2] = useState(0);
  const [scrollWidth2, setScrollWidth2] = useState(0);
  const [clientWidth2, setClientWidth2] = useState(0);
  const scrollRef2 = useRef(null);
  const scrollLeft2 = () => setScroll2((scrollRef2.current.scrollLeft -= 100));
  const scrollRight2 = () =>
    setScroll2((scrollRef2.current.scrollRight += 100));

  useEffect(() => {
    setScrollWidth(scrollRef?.current?.scrollWidth);
    setClientWidth(scrollRef?.current?.clientWidth);
  }, [scroll]);
  useEffect(() => {
    setScrollWidth1(scrollRef1?.current?.scrollWidth1);
    setClientWidth1(scrollRef1?.current?.clientWidth1);
  }, [scroll1]);
  useEffect(() => {
    setScrollWidth2(scrollRef2?.current?.scrollWidth2);
    setClientWidth2(scrollRef2?.current?.clientWidth2);
  }, [scroll2]);

  const loggedSession = useSelector((state) => state.session.user);
  useEffect(() => {
    const fetchSongs = async () => {
      await dispatch(getSongs());
    };
    fetchSongs();
  }, []);
  const songState = useSelector((state) => Object.values(state.songs));

  const randomIndex = [];
  for (let i = 0; i < 25; i++) {
    const indices = Math.floor(Math.random() * songState.length);
    randomIndex.push(indices);
  }
  const randomSongs = [];
  for (let i = 0; i < 25; i++) {
    const song = songState[randomIndex[i]];
    randomSongs.push(song);
  }

  const randomPressed = [];
  for (let i = 0; i < 25; i++) {
    const indices = Math.floor(Math.random() * songState.length);
    randomPressed.push(indices);
  }
  const randomPressedSongs = [];
  for (let i = 0; i < 25; i++) {
    const song = songState[randomPressed[i]];
    randomPressedSongs.push(song);
  }

  const randomCharts = [];
  for (let i = 0; i < 25; i++) {
    const indices = Math.floor(Math.random() * songState.length);
    randomCharts.push(indices);
  }
  const randomChartsSongs = [];
  for (let i = 0; i < 25; i++) {
    const song = songState[randomCharts[i]];
    randomChartsSongs.push(song);
  }

  // const logOut = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  //   history.push("/");
  // };
  // console.log(songState, "here");
  return (
    <>
      {loggedSession ? (
        <div className="songsDiv">
          <div className="moreSongs-title">More of what you like</div>
          <div className="slider moreSongs" ref={scrollRef}>
            <div className="landingSongs">
              {randomSongs.map((song) => (
                <NavLink className="landing-song-link" to={`/songs/${song.id}`}>
                  <div className="landing-cover-art">
                    <div className="landing-songImg-box">
                      <img
                        className="landing-img"
                        src={song.previewImage || song.url}
                        alt="landing-song"
                      />
                    </div>
                    <div className="landing-title">
                      <div>{song.title}</div>
                      <div>{song.user}</div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>

            <button className="carousel-prev" onClick={scrollLeft}>
              &#10094;
            </button>
            <button className="carousel-next" onClick={scrollRight}>
              &#10095;
            </button>
          </div>
          <div className="pressed-title">Fresh Pressed</div>
          <div className="slider pressed" ref={scrollRef1}>
            <div className="landingSongs1">
              {randomPressedSongs.map((song) => (
                <NavLink className="landing-song-link" to={`/songs/${song.id}`}>
                  <div className="landing-cover-art">
                    <div className="landing-songImg-box">
                      <img
                        className="landing-img"
                        src={song.previewImage || song.url}
                        alt="landing-song"
                      />
                    </div>
                    <div className="landing-description-container">
                      <div className="landing-title">
                        <li>{song.title}</li>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
            <button className="carousel-prev1" onClick={scrollLeft1}>
              &#10094;
            </button>
            <button className="carousel-next1" onClick={scrollRight1}>
              &#10095;
            </button>
          </div>

          <div className="charts-title">Charts: Top 50</div>
          <div className="slider charts" ref={scrollRef2}>
            <div className="landingSongs2">
              {randomChartsSongs.map((song) => (
                <NavLink className="landing-song-link" to={`/songs/${song.id}`}>
                  <div className="landing-cover-art">
                    <div className="landing-songImg-box">
                      <img
                        className="landing-img"
                        src={song.previewImage || song.url}
                        alt="landing-song"
                      />
                    </div>
                    <div className="landing-description-container">
                      <div className="landing-title">
                        <li>{song.title}</li>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
            <button className="carousel-prev2" onClick={scrollLeft2}>
              &#10094;
            </button>
            <button className="carousel-next2" onClick={scrollRight2}>
              &#10095;
            </button>
          </div>

          {/* ) */}
        </div>
      ) : (
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
                  SoundStrata Plus+ lets you listen offline, ad-free with over
                  150 million tracks - and growing.
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
          <Footer />
        </div>
      )}
    </>
  );
};

export default LandingPage;
