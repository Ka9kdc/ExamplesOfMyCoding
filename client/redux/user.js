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

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/api/user/me')
    dispatch(setCurrentUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const login = (credentials, history) => dispatch => {
  console.log('login')
    axios.put('/api/user/login', credentials)
    .then(res => dispatch(setCurrentUser(res.data)))
    .catch(err => console.error(`Logging in with ${credentials.Callsign} and ${credentials.password} was unsuccessful`, err))
}

export const logout = () => dispatch => {
    axios.delete('api/user/logout')
      .then(res => dispatch(removeCurrentUser(res.data)))
      .catch(err => console.error('Logging out was unsuccesful', err))
  }
  
  export const fetchCurrentUser = () => dispatch => {
    axios.get('/api/user/me')
      .then(res => dispatch(setCurrentUser(res.data)))
      .catch(err => console.error('Fetching current user failed', err))
  }

export const signUp = (newUser) => dispatch => {
  axios.post('/api/user/signUp', newUser)
  .then(res => dispatch(setCurrentUser(res.data)))
  .catch(err => console.error(err))
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