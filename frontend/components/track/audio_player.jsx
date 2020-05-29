import React from 'react';
import {NavLink} from 'react-router-dom';

class AudioPlayer extends React.Component {
    constructor(props) {
        super(props)
    
    }

    componentDidUpdate() {
      const { track, playing, changePlayerTrack, changeCurrentTrack } = this.props; 
      
      const audio = document.getElementById("audio");
         if (audio && changePlayerTrack) { 
           console.log("did we hit this")
            audio.src = track.trackUrl;
         }
         if(audio) {
            if (playing) {
              audio.play();
            } else {
              audio.pause();
            }
          }
         changeCurrentTrack(false); 
    }

    render() {
         const { track, artist } = this.props;
          if (!track || !artist) return null; 

       return( 
       <footer className ="audio-player-container">
            <div className ="audio-player">
                <audio id="audio" 
                    controls controlsList="nodownload">
                    <source type="audio/mp3" />
                </audio>
            </div>
            <div className="audio-player-info">
                <div className="audio-player-artist-pic">
                    <img className="audio-player-artist-pic-img"
                        src={this.props.artist.profilePhotoUrl}
                        alt="ArtistProfilePic" />
                </div>
                <div className = "audio-player-artist-info">
                       <NavLink to={`/users/${artist.id}`} className="audio-player-artist-name">{artist.username}</NavLink>   
                       <p className="audio-player-track-title">{track.title}</p>
                </div>
            </div>
       </footer>
       )
    }
}

export default AudioPlayer; 