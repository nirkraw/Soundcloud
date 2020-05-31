import React from 'react';
import WaveSurfer from 'wavesurfer.js';

class Waveform extends React.Component {
    constructor(props) {
        super(props)
        this.state={id: null}
    }

    componentDidMount() {
        if(this.props.track) {
            this.wavesurfer = WaveSurfer.create({
              container: `#waveform-${this.props.track.id}`,
              fillParent: true,
              barHeight: 0.7,
              barWidth: 3,
            //   backgroundColor: "#ffffff",
              waveColor: "#A9A9A9",
              progressColor: "#FF5500",
              height: 100,
              partialRender: true,
              interaction: false,
              removeMediaElementOnDestroy: true,
              closeAudioContext: true,
              responsive: true,
              cursorWidth: 0,
            });
           this.wavesurfer.load(this.props.track.trackUrl);
           this.wavesurfer.setMute();
           
        }
    }
    
    componentDidUpdate() {
        const {track, changeCurrentTrack, currentTrack, changePlayerTrack } = this.props;
        const audio = document.getElementById("audio");

        // if(changePlayerTrack && currentTrack.id === track.id) {
        //     // this.setState({id: currentTrack.id})
        //     debugger
        //     this.wavesurfer.destroy();
        //     changeCurrentTrack(false);
            
        //   this.wavesurfer = WaveSurfer.create({
        //     container: `#waveform-${track.id}`,
        //     fillParent: true,
        //     barHeight: 0.7,
        //     barWidth: 3,
        //     closeAudioContext: true,
        //     backgroundColor: "#ffffff",
        //     waveColor: "#A9A9A9",
        //     height: 100,
        //     partialRender: true,
        //     interaction: false,
        //     removeMediaElementOnDestroy: true,
        //     responsive: true,
        //     cursorWidth: 0,
        //   });
        //   this.wavesurfer.load(track.trackUrl);
        //   this.wavesurfer.setMute();
        // }
        if (
          currentTrack.id === track.id &&
          this.wavesurfer.container.id === `waveform-${currentTrack.id}`
        ) {
          setInterval(() => {
            this.wavesurfer.getDuration() + 0.01;

            if (this.wavesurfer.getDuration() !== 0) {
                // console.log(currentTrack.id)
              this.wavesurfer.seekTo(
                audio.currentTime / this.wavesurfer.getDuration()
              );
            }
          }, 500);
        } 
         
    }


    render() {
       
        return (
        <div className="waveform-container">
            <div id={`waveform-${this.props.track.id}`}></div>
        </div>
        )
    }
}

export default Waveform; 