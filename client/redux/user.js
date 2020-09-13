import axios from 'axios';


const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

const setCurrentUser = user =>{
    return {
        type: SET_CURRENT_USER,
        user
    }
}

const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    }
}

export const login = (credentials, history) => dispatch => {
    axios.put('/api/user/login', credentials)
    .then(res => setUserAndRedirect(res.data, history, dispatch))
    .catch(err => console.error(`Logging in with ${credentials.email} and ${credentials.password} was unsuccessful`, err))
}

export const logout = history => dispatch => {
    axios.delete('api/user/logout')
      .then(res => dispatch(removeCurrentUser(res.data)))
      .then(() => history.push('/login'))
      .catch(err => console.error('Logging out was unsuccesful', err))
  }
  
  export const fetchCurrentUser = () => dispatch => {
    axios.get('/api/user/me')
      .then(res => dispatch(setCurrentUser(res.data)))
      .catch(err => console.error('Fetching current user failed', err))
  }

  function setUserAndRedirect (user, history, dispatch) {
    console.log('setUserAndRedirect')
    dispatch(setCurrentUser(user))
    dispatch(create(user))
    history.push(`/memberPage`)
  }


  export default function userReducer (currentUser = {}, action) {
    switch (action.type) {
  
      case SET_CURRENT_USER:
        return action.user
  
      case REMOVE_CURRENT_USER:
        return {}
  
      default:
        return currentUser
    }
  }