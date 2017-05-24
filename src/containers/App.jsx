import * as React           from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import AppBar               from 'material-ui/AppBar';
import Snackbar             from 'material-ui/Snackbar';
import Drawer               from 'material-ui/Drawer';
import MenuItem             from 'material-ui/MenuItem';
import CircularProgress     from 'material-ui/CircularProgress';
import { withRouter }       from 'react-router-dom';
import {
  toggleDrawler,
  closeMessage,
} from '../actions/app';

const progressStyle = {
  position:        'absolute',
  top:             0,
  left:            0,
  width:           '100%',
  height:          '100%',
  backgroundColor: 'rgba(10, 10, 10, 0.4)',
  zIndex:          2000,
};

class App extends React.Component {
  static get propTypes() {
    return {
      handleLogoutMenuClick:  PropTypes.func.isRequired,
      handleSignUpMenuClick:  PropTypes.func.isRequired,
      handleArtistsMenuClick: PropTypes.func.isRequired,
      handleTracksMenuClick:  PropTypes.func.isRequired,
      handleClick:            PropTypes.func.isRequired,
      handleMessageClose:     PropTypes.func.isRequired,
      drawlerIsOpen:          PropTypes.bool.isRequired,
      progress:               PropTypes.bool.isRequired,
      title:                  PropTypes.string.isRequired,
      message:                PropTypes.string.isRequired,
      isLoggedIn:             PropTypes.bool.isRequired,
      children:               PropTypes.array.isRequired,
    };
  }
  render() {
    const menuItems = [];
    if (this.props.isLoggedIn) {
      menuItems.push(<MenuItem key="logout" onTouchTap={this.props.handleLogoutMenuClick}>Logout</MenuItem>);
    } else {
      menuItems.push(<MenuItem key="signup" onTouchTap={this.props.handleSignUpMenuClick}>Sign Up</MenuItem>);
    }
    menuItems.push(<MenuItem key="artists" onTouchTap={this.props.handleArtistsMenuClick}>Artists</MenuItem>);
    menuItems.push(<MenuItem key="tracks" onTouchTap={this.props.handleTracksMenuClick}>Tracks</MenuItem>);
    const progress = !this.props.progress ? null : (
      <div style={progressStyle}>
        <CircularProgress style={{ marginTop: '45%', marginLeft: '49%' }} />
      </div>
    );
    return (
      <div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={this.props.handleClick}
        />
        <Drawer open={this.props.drawlerIsOpen}>
          <AppBar
            title="Menu"
            onLeftIconButtonTouchTap={this.props.handleClick}
          />
          {menuItems}
        </Drawer>
        <Snackbar
          open={this.props.message.length > 0}
          message={this.props.message}
          autoHideDuration={4000}
          onRequestClose={this.props.handleMessageClose}
        />
        {this.props.children}
        {progress}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    title:         state.app.title,
    drawlerIsOpen: state.app.drawlerIsOpen,
    message:       state.app.message,
    isLoggedIn:    state.app.isLoggedIn,
    progress:      state.app.progress,
  };
}

function mapDispatchToProps(dispatch, { history }) {
  return {
    handleClick:           () => dispatch(toggleDrawler()),
    handleLogoutMenuClick: () => {
      window.location.href = '/logout';
    },
    handleSignUpMenuClick: () => {
      window.location.href = '/signup';
    },
    handleArtistsMenuClick: () => {
      history.push({ pathname: '/artists' });
      dispatch(toggleDrawler());
    },
    handleTracksMenuClick: () => {
      history.push({ pathname: '/tracks' });
      dispatch(toggleDrawler());
    },
    handleMessageClose: () => {
      dispatch(closeMessage());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

