import React from 'react'
import { Redirect } from 'react-router-dom';

class TrackUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            title: "",
            description: "",
            genre: "",
            photoFile: null,
            trackFile: null,
            artist_id: this.props.currentUser.id,
            submited: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTrack = this.handleTrack.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
    }

    handleInput(type) {
        return e => this.setState({ [type]: e.currentTarget.value })
    }

    handleTrack(e) {
       this.setState({trackFile: e.currentTarget.files[0]});
    }

    handlePhoto(e) {
        this.setState({ photoFile: e.currentTarget.files[0] });
    }

    handleSubmit(e) {
        debugger
        e.preventDefault();
        const formData = new FormData();
        formData.append('track[title]', this.state.title);
        formData.append('track[genre]', this.state.genre);
        formData.append('track[description]', this.state.description);
        formData.append('track[artist_id]', this.state.artist_id);
        formData.append('track[photo]', this.state.photoFile);
        formData.append('track[audio]', this.state.trackFile);
        this.props.createTrack(formData)
        this.setState({submited: true})
    }
    
    render() {
        if(this.state.submited) return(<Redirect to={`users/${currentUser.id}`}/>)
        const genreSelector = (
            <select 
            value = {this.state.genre} 
            onChange={this.handleInput('genre')}
            className="genre-input"
            >
                <option value="None">None</option>
                <option value="Alternative Rock">Alternative Rock</option>
                <option value="Ambient">Ambient</option>
                <option value="Classical">Classical</option>
                <option value="Country">Country</option>
                <option value="Dance and EDM">Dance EDM</option>
                <option value="Dancehall">Dancehall</option>
                <option value="DeepHouse">DeepHouse</option>
                <option value="Disco">Disco</option>
                <option value="Drum and Bass">Drum and Bass</option>
                <option value="Electronic">Electronic</option>
                <option value="Folk and Singer-Songwriter">Folk and Singer-Songwriter</option>
                <option value="Hip-Hop and Rap">Hip-Hop and Rap</option>
                <option value="House">House</option>
                <option value="Indie">Indie</option>
                <option value="Jazz and Blues">Jazz and Blues</option>
                <option value="Latin">Latin</option>
                <option value="Metal">Metal</option>
                <option value="Piano">Piano</option>
                <option value="Pop">Pop</option>
                <option value="RnB and Soul">RnB and Soul</option>
                <option value="Reggae">Reggae</option>
                <option value="Reggaeton">Reggaeton</option>
                <option value="Rock">Rock</option>
                <option value="Soundtrack">Soundtrack</option>
                <option value="Techno">Techno</option>
                <option value="Trance">Trance</option>
                <option value="Trap">Trap</option>
                <option value="Triphop">Triphop</option>
                <option value="World">World</option>
            </select>
        )

        const errorsLi = this.props.errors.map(
            error => <li
                className="session-errors"
                key={error}
            >{error}</li>
        )


        return(
                <form onSubmit={this.handleSubmit} className="upload-form-box">
                    <div onClick={this.props.closeModal} className="close-x">X</div>
                        <div className="div1">
                            <h3>Basic info</h3>
                            {errorsLi}
                        </div>
                        <div className="div2">
                            <div className ="div2a">
                                <div className="photo-container">
                                    <label>Upload photo
                                    <   input
                                            type="file"
                                            onChange={this.handlePhoto} />
                                    </label>
                                </div>
                                <label>Upload track
                                <   input 
                                    type="file" 
                                    onChange={this.handleTrack} />
                                </label>
                            </div>
                            <div className="div2b">
                                <label>Title*
                                    <br/>
                                    <input type="text"
                                        value={this.state.title}
                                        placeholder="Add title here"
                                        onChange={this.handleInput('title')}
                                        className="title-input"
                                    />
                                </label>
                                <label>Genre
                                    <br/>
                                {genreSelector}
                                </label>
                                <label>Description
                                    <br/>
                                    <textarea 
                                    value={this.state.description}
                                    cols="30" rows="10" 
                                    placeholder="Describe your track"
                                    onChange= {this.handleInput("description")}
                                    className="description-input"
                                    spellCheck="true"
                                    ></textarea>
                                </label>
                            </div>
                        </div>
                        <div className="div3">
                            <p className="required-fields">* Required fields</p>
                            <button className="upload-submit">Save</button>
                    </div>
                </form>
        )
    }
}

export default TrackUpload; 