import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../reduxStore/user';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
  return (
    <div>
      <div className="Subtitle" style={{ textAlign: 'center' }}>
        Login
      </div>

      <form onSubmit={props.handleSubmit} id="login">
        <div>
          <div>
            <label htmlFor="Callsign">Callsign: </label>
            <input type="text" name="Callsign" required />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </div>
        <button>
          <Link to="/MemberPageSignup">Sign UP</Link>
        </button>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit: (event) => {
    event.preventDefault();
    const Callsign = event.target.Callsign.value;
    const password = event.target.password.value;
    const credentials = { Callsign, password };
    dispatch(login(credentials, ownProps.history));
  },
});

export default connect(null, mapDispatch)(LoginForm);
