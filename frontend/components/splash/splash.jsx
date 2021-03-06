import React from 'react';
import { NavLink } from 'react-router-dom';

class Splash extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchTracks();
        this.props.fetchUsers();
        this.props.changeTrack(false);
    }


    playTrack(track, artist) {
        this.props.updatePlayerTrack(track)
        this.props.updatePlayerArtist(artist)
        this.props.playTrack()
        if(this.props.currentTrack.id !== track.id) {
          this.props.changeTrack(true);
        }
    }

    pauseTrack() {
        this.props.pauseTrack();
        this.props.changeTrack(false);
    }

    render() {
        const {allTracks, allUsers, currentTrack, playing, currentUser} = this.props
        if(allTracks.length < 1) return null;
        if(allUsers.length < 1) return null; 
        return (
          <div className="splash-container">
            <div className="top-banner"></div>
            <div className="splash-content-container">
              <h1>Hear what's trending for free in the SoundSky community</h1>
              <div className="track-rows-container">
                <div className="track-row-container">
                  <div className="image-container">
                    <img src={allTracks[10].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[10].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[10],
                              allUsers[allTracks[10].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[10].artist_id}/${allTracks[10].id}`}
                    >
                      {allTracks[10].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[10].artist_id}`}
                    >
                      {allUsers[allTracks[10].artist_id].username}
                    </NavLink>
                  </div>
                  <div className="image-container">
                    <img src={allTracks[4].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[4].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[4],
                              allUsers[allTracks[4].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[4].artist_id}/${allTracks[4].id}`}
                    >
                      {allTracks[4].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[4].artist_id}`}
                    >
                      {allUsers[allTracks[4].artist_id].username}
                    </NavLink>
                  </div>
                  <div className="image-container">
                    <img src={allTracks[6].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[6].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[6],
                              allUsers[allTracks[6].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[6].artist_id}/${allTracks[6].id}`}
                    >
                      {allTracks[6].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[6].artist_id}`}
                    >
                      {allUsers[allTracks[6].artist_id].username}
                    </NavLink>
                  </div>
                  <div className="image-container">
                    <img src={allTracks[2].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[2].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[2],
                              allUsers[allTracks[2].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[2].artist_id}/${allTracks[2].id}`}
                    >
                      {allTracks[2].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[2].artist_id}`}
                    >
                      {allUsers[allTracks[2].artist_id].username}
                    </NavLink>
                  </div>
                  <div className="image-container">
                    <img src={allTracks[7].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[7].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[7],
                              allUsers[allTracks[7].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[7].artist_id}/${allTracks[7].id}`}
                    >
                      {allTracks[7].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[7].artist_id}`}
                    >
                      {allUsers[allTracks[7].artist_id].username}
                    </NavLink>
                  </div>
                  <div className="image-container">
                    <img src={allTracks[8].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[8].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[8],
                              allUsers[allTracks[8].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[8].artist_id}/${allTracks[8].id}`}
                    >
                      {allTracks[8].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[8].artist_id}`}
                    >
                      {allUsers[allTracks[8].artist_id].username}
                    </NavLink>
                  </div>
                </div>
                <div className="track-row-container2">
                  <div className="image-container">
                    <img src={allTracks[11].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[11].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[11],
                              allUsers[allTracks[11].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[11].artist_id}/${allTracks[11].id}`}
                    >
                      {allTracks[11].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[11].artist_id}`}
                    >
                      {allUsers[allTracks[11].artist_id].username}
                    </NavLink>
                  </div>
                  <div className="image-container">
                    <img src={allTracks[13].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[13].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[13],
                              allUsers[allTracks[13].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[13].artist_id}/${allTracks[13].id}`}
                    >
                      {allTracks[13].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[13].artist_id}`}
                    >
                      {allUsers[allTracks[13].artist_id].username}
                    </NavLink>
                  </div>
                  <div className="image-container">
                    <img src={allTracks[5].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[5].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[5],
                              allUsers[allTracks[5].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[5].artist_id}/${allTracks[5].id}`}
                    >
                      {allTracks[5].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[5].artist_id}`}
                    >
                      {allUsers[allTracks[5].artist_id].username}
                    </NavLink>
                  </div>
                  <div className="image-container">
                    <img src={allTracks[9].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[9].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[9],
                              allUsers[allTracks[9].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[9].artist_id}/${allTracks[9].id}`}
                    >
                      {allTracks[9].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[9].artist_id}`}
                    >
                      {allUsers[allTracks[9].artist_id].username}
                    </NavLink>
                  </div>
                  <div className="image-container">
                    <img src={allTracks[0].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[0].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[0],
                              allUsers[allTracks[0].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[0].artist_id}/${allTracks[0].id}`}
                    >
                      {allTracks[0].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[0].artist_id}`}
                    >
                      {allUsers[allTracks[0].artist_id].username}
                    </NavLink>
                  </div>
                  <div className="image-container">
                    <img src={allTracks[1].photoUrl} />
                    <div className="splash-play-pause-buttons-container">
                      {playing && allTracks[1].id === currentTrack.id ? (
                        <img
                          onClick={() => this.pauseTrack()}
                          className="splash-pause-button"
                          src="/assets/pause-button-2.png"
                          alt="pause-button"
                        />
                      ) : (
                        <img
                          onClick={() =>
                            this.playTrack(
                              allTracks[1],
                              allUsers[allTracks[1].artist_id]
                            )
                          }
                          className="splash-play-button"
                          src="/assets/play-button-2.png"
                          alt="play-button"
                        />
                      )}
                    </div>
                    <NavLink
                      className="splash-track-title"
                      to={`users/${allTracks[1].artist_id}/${allTracks[1].id}`}
                    >
                      {allTracks[1].title}
                    </NavLink>
                    <NavLink
                      className="splash-artist-link"
                      to={`users/${allTracks[1].artist_id}`}
                    >
                      {allUsers[allTracks[1].artist_id].username}
                    </NavLink>
                  </div>
                </div>
                <div className="join-in-container">
                  <h1>Thanks for listening. Now join in.</h1>
                  {currentUser ? (
                    <NavLink to="/upload">
                      <button className="splash-upload">Upload</button>
                    </NavLink>
                  ) : (
                    <div className="splash-buttons-container">
                      <h1>
                        Save tracks, follow artists and build playlists. All for
                        free.
                      </h1>
                      <button
                        onClick={() => this.props.openModal("signup")}
                        className="splash-create-account"
                      >
                        Create Account
                      </button>
                      <div className="splash-signin-container">
                        <p>Already have an account?</p>
                        <button
                          onClick={() => this.props.openModal("login")}
                          className="splash-sign-in"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Splash;
