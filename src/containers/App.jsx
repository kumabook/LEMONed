import * as React           from 'react';
import { connect }          from 'react-redux';
import AppBar               from 'material-ui/AppBar';
import Snackbar             from 'material-ui/Snackbar';
import Drawer               from 'material-ui/Drawer';
import MenuItem             from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd           from 'material-ui/svg-icons/content/add';
import { withRouter }       from 'react-router-dom';
import {
  toggleDrawler,
  closeMessage,
} from '../actions';

class App extends React.Component {
  render() {
    const plusButton = (
      <FloatingActionButton
        secondary
        mini
        onTouchTap={this.props.handlePlusButtonClick}
      >
        <ContentAdd />
      </FloatingActionButton>
    );
    const menuItems = [];
    if (this.props.isLoggedIn) {
      menuItems.push(<MenuItem key="logout" onTouchTap={this.props.handleLogoutMenuClick}>Logout</MenuItem>);
    } else {
      menuItems.push(<MenuItem key="signup" onTouchTap={this.props.handleSignUpMenuClick}>Sign Up</MenuItem>);
    }
    menuItems.push(<MenuItem key="tracks" onTouchTap={this.props.handleTracksMenuClick}>Tracks</MenuItem>);
    return (
      <div>
        <AppBar
          title={this.props.title}
          iconElementRight={plusButton}
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
  };
}

function mapDispatchToProps(dispatch, { history }) {
  return {
    handleClick:           () => dispatch(toggleDrawler()),
    handlePlusButtonClick: () => {
      history.push('/tracks/new');
    },
    handleLogoutMenuClick: () => {
      window.location.href = '/logout';
    },
    handleSignUpMenuClick: () => {
      window.location.href = '/signup';
    },
    handleTracksMenuClick: () => {
      history.push({ pathname: '/tracks', query: { page: 0 } });
      dispatch(toggleDrawler());
    },
    handleMessageClose: () => {
      dispatch(closeMessage());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

