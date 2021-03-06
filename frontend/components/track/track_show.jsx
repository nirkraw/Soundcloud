import React from "react";
import formatUploadTime from "../../utils/time_format_util";
import { NavLink } from "react-router-dom";
import WaveFormContainer from "../waveform/waveform_container";


class TrackShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      randNum: Math.floor(Math.random() * 11),
      deleteContainer: false,
      commentId: null 
    };

    this.playTrack = this.playTrack.bind(this);
    this.pauseTrack = this.pauseTrack.bind(this);
    this.likeTrack = this.likeTrack.bind(this);
    this.unlikeTrack = this.unlikeTrack.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.createComment = this.createComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.findRelatedTrack = this.findRelatedTrack.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeDeleteConfirmation = this.closeDeleteConfirmation.bind(this);
    this.deleteOrEdit = this.deleteOrEdit.bind(this);
  }

  componentDidMount() {
    this.props.fetchTracks();
    this.props.fetchAllUsers();
    this.props.changeTrack(false);
  }

  playTrack() {
    this.props.updatePlayerTrack(this.props.track);
    this.props.updatePlayerArtist(this.props.artist);
    this.props.playTrack();
    this.props.changeTrack(true);
  }

  pauseTrack() {
    this.props.pauseTrack();
    this.props.changeTrack(true);
  }

  likeTrack(e) {
    if (!this.props.currentUser) {
      this.props.openModal("login");
      return null;
    }
    e.preventDefault();
    this.props.likeTrack({
      track_id: this.props.track.id,
      user_id: this.props.currentUser.id,
    });
    this.props.fetchTracks();
  }

  unlikeTrack(e, likeId) {
    if (!this.props.currentUser) {
      this.props.openModal("login");
      return null;
    }
    e.preventDefault();
    this.props.unlikeTrack(likeId);
    this.props.fetchTracks();
  }

  handleInput(e) {
    if (!this.props.currentUser) {
      this.props.openModal("login");
      return null;
    }
    e.preventDefault();
    this.setState({ comment: e.target.value });
  }

  createComment(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      this.props.createNewComment({
        body: this.state.comment,
        track_id: this.props.track.id,
        user_id: this.props.currentUser.id,
      });
      this.props.fetchTracks();
      this.setState({ comment: "" });
    }
  }

  deleteComment(e, commentId) {
    e.preventDefault();
    this.props.destroyNewComment(commentId);
    this.props.fetchTracks();
  }

  findRelatedTrack(tracks, trackId) {
    for (let i = 0; i < tracks.length; i++) {
      const element = tracks[i];
      if (element.id !== trackId) {
        return element.id;
      }
    }
  }

  confirmDelete(e, commentId) {
    e.preventDefault();
    this.setState({ deleteContainer: true, commentId: commentId });
    const deleteContainer = document.getElementsByClassName(
      "delete-comment-confirmation-container"
    )[0];
    deleteContainer.classList.remove("delete-none");
  }

  closeDeleteConfirmation() {
    if (this.state.deleteContainer) {
      const deleteContainer = document.getElementsByClassName(
        "delete-comment-confirmation-container"
      )[0];
      deleteContainer.classList.add("delete-none");
      this.setState({ deleteContainer: false });
    }
  }

  deleteOrEdit(e, type) {
    e.preventDefault();
    this.props.openModal(type, this.props.track.id, this.props.currentUser.id);
  }

  render() {
    const {
      track,
      artist,
      playing,
      currentTrack,
      currentUser,
      users,
    } = this.props;
    if (!track) return null;

    let likeButton = (
      <div className="track-show-like-button" onClick={this.likeTrack}>
        <img
          className="track-show-like-icon"
          src="/assets/heart.png"
          alt="heart"
        />
        <p>Like</p>
      </div>
    );
    for (let i = 0; i < track.likes.length; i++) {
      const like = track.likes[i];
      if (currentUser && like.user_id === currentUser.id) {
        likeButton = (
          <div
            className="track-show-liked-button"
            onClick={(e) => this.unlikeTrack(e, like.id)}
          >
            <img
              className="track-show-like-icon"
              src="/assets/heart-red"
              alt="red heart"
            />
            <p>Liked</p>
          </div>
        );
      }
    }

    let trackComments;
    if (track.comments.length === 0) {
      trackComments = (
        <div className="quiet-container">
          <img
            className="comment-icon-big"
            src="/assets/speech-bubble.png"
            alt="comment-icon"
          />
          <h1 className="quiet-header-1">Seems a little quiet over here</h1>
          <h1 className="quiet-header-2">
            Be the first to comment on this track
          </h1>
        </div>
      );
    } else {
      trackComments = track.comments.map((comment) => {
        const commentUser = users[comment.user_id];
        return (
          <div key={comment.id} className="comment-section">
            <div className="comment-section-content">
              <img
                className="comment-user-pic"
                src={commentUser.profilePhotoUrl}
                alt="user-pic"
              />
              <div className="comment-artist-info">
                <NavLink
                  to={`/users/${commentUser.id}`}
                  className="comment-username"
                >
                  {commentUser.username}
                </NavLink>
                <p className="comment-body">{comment.body}</p>
              </div>
            </div>
            <div className="comment-section-time">
              <p className="comment-uploaded-time">
                {formatUploadTime(comment.created_at)}
              </p>
            </div>
            {currentUser &&
            (currentUser.id === commentUser.id ||
              currentUser.id === track.artist_id) ? (
              <div className="comment-trash-icon-container">
                <img
                  className="comment-trash-icon"
                  onClick={(e) => this.confirmDelete(e, comment.id)}
                  src="/assets/trash.png"
                  alt="pencil"
                />
              </div>
            ) : null}
            {this.state.deleteContainer &&
            comment.id === this.state.commentId ? (
              <div className="delete-comment-confirmation-container">
                <p>Do you really want to remove this comment?</p>
                <div className="delete-comment-buttons-container">
                  <div
                    className="delete-comment-cancel-button"
                    onClick={this.closeDeleteConfirmation}
                  >
                    <p>Cancel</p>
                  </div>
                  <div
                    className="delete-comment-delete-button"
                    onClick={(e) => this.deleteComment(e, comment.id)}
                  >
                    <p>Yes</p>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        );
      });
    }

    let relatedTrack = this.props.tracks[this.state.randNum];
    const relatedTrackId = this.findRelatedTrack(artist.tracks, track.id);

    if (artist.tracks.length > 1) {
      for (let i = 0; i < this.props.tracks.length; i++) {
        const ele = this.props.tracks[i];
        if (ele.id === relatedTrackId) {
          relatedTrack = ele;
        }
      }
    }

    return (
      <div className="outside-container">
        <div
          className="track-show-main-container"
          onClick={this.closeDeleteConfirmation}
        >
          <div className="track-show-top-banner">
            <div className="track-show-play-pause-buttons-container">
              {playing && track.id === currentTrack.id ? (
                <img
                  onClick={() => this.pauseTrack()}
                  className="track-show-pause-button"
                  src="/assets/pause-button-2.png"
                  alt="pause-button"
                />
              ) : (
                <img
                  onClick={() => this.playTrack()}
                  className="track-show-play-button"
                  src="/assets/play-button-2.png"
                  alt="play-button"
                />
              )}
            </div>
            <NavLink to={`/users/${artist.id}`} className="track-show-artist">
              {artist.username}
            </NavLink>
            <h1 className="track-show-title">{track.title}</h1>
            <p className="track-show-uploaded-time">
              {formatUploadTime(track.created_at)}
            </p>
            <p className="track-show-track-genre">{`#${track.genre}`}</p>
            <img
              className="track-show-album-pic"
              src={track.photoUrl}
              alt="album pic"
            />
          </div>
          <div className="waveform-track-show-container">
            <WaveFormContainer track={track} />
          </div>
          <div className="main-content-and-related-tracks-container">
            <div className="track-show-main-content">
              <div className="write-comment-container">
                {currentUser ? (
                  <img
                    className="track-show-artist-pic"
                    src={currentUser.profilePhotoUrl}
                    alt="artist-pic"
                  />
                ) : (
                  <img
                    className="track-show-artist-pic"
                    src="/assets/background.jpg"
                    alt="artist-pic"
                  />
                )}
                <input
                  onKeyDown={this.createComment}
                  onChange={this.handleInput}
                  className="write-comment-input"
                  value={this.state.comment}
                  type="text"
                  placeholder="Write a comment"
                />
              </div>
              <div className="track-show-buttons-container">
                {likeButton}
                {this.props.currentUser === artist ? (
                  <div
                    className="track-show-edit-button"
                    onClick={(e)=> this.deleteOrEdit(e, "edit")}
                  >
                    <img
                      className="track-show-pencil-icon"
                      src="/assets/pencil.png"
                      alt="pencil"
                    />
                    <p>Edit</p>
                  </div>
                ) : null}
                {this.props.currentUser === artist ? (
                  <div
                    className="track-show-delete-button"
                      onClick={(e)=> this.deleteOrEdit(e, "delete")}
                  >
                    <img
                      className="track-show-trash-icon"
                      src="/assets/trash.png"
                      alt="pencil"
                    />
                    <p>Delete</p>
                  </div>
                ) : null}
              </div>
              <div className="track_info_and_comments_container">
                <div className="artist-info-and-picture">
                  <img
                    className="track-show-main-artist-pic"
                    src={artist.profilePhotoUrl}
                    alt="artist-pic"
                  />
                  <div className="artist-info">
                    <NavLink
                      to={`/users/${artist.id}`}
                      className="track-show-artist-name"
                    >
                      {artist.username}
                    </NavLink>
                  </div>
                </div>
                <div className="comments-container">
                  <div className="track-show-description-container">
                    <h2 className="track-show-description">
                      {track.description}
                    </h2>
                    <p className="track-show-track-genres">{`#${track.genre}`}</p>
                    {track.comments.length > 1 ? (
                      <p className="number-of-comments">
                        <img
                          className="comment-icon"
                          src="/assets/comment.png"
                          alt="comment-icon"
                        />
                        {track.comments.length} comments
                      </p>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  {trackComments}
                </div>
              </div>
            </div>
            <div className="track-show-related-tracks">
              <div className="related-tracks-header-container">
                <div className="related-track-header-and-icon">
                  <img
                    className="sound-bar-icon"
                    src="/assets/sound-bar.png"
                    alt="sound-bar"
                  />
                  <h1 className="related-tracks-header">Related tracks</h1>
                </div>
                <NavLink
                  to={`/users/${relatedTrack.artist.id}`}
                  className="view-all-header"
                >
                  View all
                </NavLink>
              </div>
              <div className="related-tracks-track">
                <img
                  className="related-tracks-album-pic"
                  src={relatedTrack.photoUrl}
                  alt="related-track-photo"
                />
                <div className="related-tracks-track-name-and-artist">
                  <NavLink
                    to={`/users/${relatedTrack.artist.id}`}
                    className="related-track-artist-name"
                  >
                    {relatedTrack.artist.username}
                  </NavLink>
                  <NavLink
                    to={`/users/${relatedTrack.artist.id}/${relatedTrack.id}`}
                    className="related-track-track-title"
                  >
                    {relatedTrack.title}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TrackShow;
