import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../redux/user';

const SignUpForm = (props) => {
  return (
    <div>
      <div className="Title">Member Page</div>

      <div className="Subtitle" style={{ textAlign: 'center' }}>
        Sign Up
      </div>

      <div className="Content">
        <form onSubmit={props.handleSubmit} id="login">
          <div>
            <div>
              <label htmlFor="Callsign">Callsign: </label>
              <input type="text" name="Callsign" required />
            </div>
            <div>
              <label htmlFor="password1">Password: </label>
              <input type="password1" name="password1" required />
            </div>
            <div>
              <label htmlFor="password2">Password: </label>
              <input type="password2" name="password2" required />
            </div>
            <button type="submit">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit: (event) => {
    event.preventDefault();
    const Callsign = event.target.Callsign.value;
    const password = event.target.password1.value;
    if (password === event.target.password2.value) {
      const newUser = { Callsign, password };
      dispatch(signUp(newUser, ownProps.history));
    } else {
      console.log('passwords dont match');
    }
  },
});

export default connect(null, mapDispatch)(SignUpForm);
