import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormModal";
import SignupFormModal from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';

import MySongs from "./components/Songs/LoggedinUser";
import SongsIndex from './components/Songs/SongsIndex'
import EditSongForm from "./components/Songs/EditSong";
import CreateSongForm from "./components/Songs/CreateSongForm";
import SongInfo from './components/Songs/SongInfo';

import MyPlaylists from "./components/Playlists/LoggedinUser";
import PlaylistIndex from './components/Playlists/PlaylistIndex'
import EditPlaylistForm from "./components/Playlists/EditPlaylist";
import CreatePlaylistForm from "./components/Playlists/CreatePlaylist";
import PlaylistInfo from './components/Playlists/PlaylistInfo';

import LandingPage from "./components/LandingPage";

import MyAlbums from './components/Albums/LoggedinUser';
import AlbumsIndex from "./components/Albums/AlbumsIndex";
import EditAlbumForm from './components/Albums/EditAlbum';
import CreateAlbumForm from "./components/Albums/CreateAlbum";
import AlbumInfo from './components/Albums/AlbumInfo';

import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (

      <div className='content-container'>
      <Switch>
        {/* <Route path="/users/login">
          login
          <LoginFormPage />
        </Route> */}
        {/* <Route path="/users/signup">
          <SignupFormModal/>
        </Route> */}
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/songs'>
          <SongsIndex />
        </Route>
        <Route exact path='/songs/new'> 
          <CreateSongForm /> 
        </Route>
        <Route exact path='/songs/:id/edit'> 
          <EditSongForm /> 
        </Route>
        <Route exact path='/songs/:id'>
          <SongInfo /> 
        </Route>
        <Route exact path='/users/:id/songs'>
          <MySongs />
        </Route>

        <Route exact path='/users/:id/playlists'>
          <MyPlaylists />
        </Route>
        <Route exact path='/playlists'>
          <PlaylistIndex />
        </Route>
        <Route exact path='/playlists/new'> 
          <CreatePlaylistForm /> 
        </Route>
        <Route exact path='/playlists/:id/edit'> 
          <EditPlaylistForm /> 
        </Route>
        <Route exact path='/playlists/:id'>
          <PlaylistInfo /> 
        </Route>
        {/* <Route exact path='/users/:id/playlists'>
          <MyPlaylists />
        </Route> */}
        <Route exact path='/users/:id/albums'>
          <MyAlbums />
        </Route>
        <Route exact path='/albums'>
          <AlbumsIndex /> 
        </Route>
        <Route exact path='/albums/new'>
          <CreateAlbumForm />
        </Route>
        <Route exact path='/albums/:id/edit'>
          <EditAlbumForm />
        </Route>
        <Route exact path='/albums/:id'>
          <AlbumInfo />
        </Route>
        
      </Switch>
      
      <Footer />
      </div>
    )}
  </>
  );
}

export default App;