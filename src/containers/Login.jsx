import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';

const Login = () => (
  <form
    style={{ margin: '40px' }}
    name="login"
    action="/login"
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
    <RaisedButton label="login" type="submit" primary />
  </form>
);

export default withRouter(Login);
