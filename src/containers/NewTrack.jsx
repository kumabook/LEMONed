import * as React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';
import { orange500, blue500 } from 'material-ui/styles/colors';
import ReactS3Uploader from 'react-s3-uploader';

class NewTrack extends React.Component {
  render() {
    return (
      <div style={{margin: '40px'}}>
        <TextField
          hintText="identifier"
          floatingLabelText="identifier"
        />
        <br />
        <TextField
          hintText="ownerId"
          floatingLabelText="ownerId"
        />
        <br />
        <TextField
          hintText="ownerName"
          floatingLabelText="ownerName"
        />
        <br />
        <TextField
          hintText="url"
          floatingLabelText="url"
        />
        <br />
        <TextField
          hintText="title"
          floatingLabelText="title"
        />
        <br />
        <TextField
          hintText="description"
          floatingLabelText="description"
        />
        <br />
        <TextField
          hintText="thumbnail_url"
          floatingLabelText="thumbnail_url"
        />
        <br />
        <TextField
          hintText="artwork_url"
          floatingLabelText="artwork_url"
        />
        <br />
        <TextField
          hintText="audio_url"
          floatingLabelText="audio_url"
        />
        <ReactS3Uploader
          signingUrl="/s3/sign"
          signingUrlMethod="GET"
          accept="image/*"
          server="http://cross-origin-server.com" />
        <br />
        <TextField
          hintText="duration"
          floatingLabelText="duration"
        />
        <br />
        <TextField
          hintText="published_at"
          floatingLabelText="published_at"
        />
        <br />
        <br />
        <RaisedButton label="Primary" primary={true} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTrack));
