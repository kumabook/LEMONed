import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import AppBar from 'material-ui/AppBar';

export interface AppProps extends RouteComponentProps<{}> { }

export type AppState = {}

class App extends React.Component<AppProps, undefined> {
  render() {
    return (
      <div>
        <AppBar title="App title" />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

