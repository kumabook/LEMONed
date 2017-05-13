import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer            from 'material-ui/Drawer';
import MenuItem          from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { withRouter } from 'react-router-dom';
import { toggleDrawler } from '../actions';

class App extends React.Component {
  render() {
    const plusButton = (
      <FloatingActionButton
        secondary={true}
        mini={true}
        onTouchTap={this.props.handlePlusButtonClick}
      >
        <ContentAdd />
      </FloatingActionButton>
    );
    return (
      <div>
        <AppBar
          title="App title"
          iconElementRight={plusButton}
          onLeftIconButtonTouchTap={this.props.handleClick}
        />
        <Drawer open={this.props.drawlerIsOpen}>
          <AppBar
            title="Menu"
            onLeftIconButtonTouchTap={this.props.handleClick}
          />
          <MenuItem onTouchTap={this.props.handleTracksMenuClick}>Tracks</MenuItem>
        </Drawer>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    drawlerIsOpen: state.app.drawlerIsOpen,
  };
}

function mapDispatchToProps(dispatch, { history }) {
  return {
    handleClick:           () => dispatch(toggleDrawler()),
    handlePlusButtonClick: () => {
      history.push('/tracks/new');
    },
    handleTracksMenuClick: () => {
      history.push({ pathname: '/tracks', query: { page: 0 } });
//      dispatch(toggleDrawler());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

