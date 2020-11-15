import React from 'react';
import { connect } from 'react-redux';
import { logout, fetchCurrentUser } from '../../redux/user';
import LoginForm from './loginForm';
import NewPost from './NewPost';

class MemberPage extends React.Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    if (!this.props.user.id) {
      return (
        <div>
          <div className="Title">Member Page</div>

          <div className="Content">
            <LoginForm />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="Title">Member Page</div>

          <div className="Content">
            <h1>Welcome Back {this.props.user.Callsign}!</h1>
            <NewPost />
            <button onClick={() => this.props.logout()}>Logout</button>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  };
};

export default connect(mapState, mapDispatch)(MemberPage);
