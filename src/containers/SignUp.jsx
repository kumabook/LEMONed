import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';

const SignUp = () => (
  <form
    style={{ margin: '40px' }}
    name="signup"
    action="/signup"
    method="post"
  >
    <TextField
      hintText="email"
      floatingLabelText="email"
      name="email"
    />
    <br />
    <TextField
      hintText="password"
      floatingLabelText="password"
      name="password"
      type="password"
    />
    <br />
    <TextField
      hintText="password confirmation"
      floatingLabelText="password confirmation"
      name="password_confirmation"
      type="password"
    />
    <br />
    <RaisedButton label="signup" type="submit" primary />
  </form>
);

export default withRouter(SignUp);
