import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyPlaying: false
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.togglePlayPreview = this.togglePlayPreview.bind(this);
    this.renderPreviewIcon = this.renderPreviewIcon.bind(this);
  }
  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button
          className="Track-action fa fa-minus-circle"
          onClick={this.removeTrack}
        >
          -
        </button>
      );
    } else {
      return (
        <button
          className="Track-action fa fa-plus-cirle"
          onClick={this.addTrack}
        >
          +
        </button>
      );
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  togglePlayPreview() {
    const audio = this.refs.audio;
    if (!this.state.currentlyPlaying) {
      audio.play();
      this.setState({
        currentlyPlaying: true
      });
    } else {
      audio.pause();
      this.setState({
        currentlyPlaying: false
      });
    }
  }

  renderPreviewIcon() {
    if (this.props.track.preview) {
      if (!this.state.currentlyPlaying) {
        return (
          <button
            className="fa fa-play Track-preview-icon"
            aria-hidden="true"
            onClick={this.togglePlayPreview}
          ></button>
        );
      } else {
        return (
          <button
            className="fa fa-pause Track-preview-icon"
            aria-hidden="true"
            onClick={this.togglePlayPreview}
          ></button>
        );
      }
    } else {
      return <p className="Track-preview-unavailable">No preview available</p>;
    }
  }

  render() {
    return (
      <div className="Track" key={this.props.track.id}>
        <div className="Track-cover-preview">
          <audio
            ref="audio"
            src={this.props.track.preview}
            onEnded={() => this.setState({ currentlyPlaying: false })}
          ></audio>
          <div className="Track-preview-container">
            {this.renderPreviewIcon}
          </div>
          <img
            className="Track-album-cover"
            src={this.props.track.cover}
            alt="Album cover"
          />
        </div>
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
