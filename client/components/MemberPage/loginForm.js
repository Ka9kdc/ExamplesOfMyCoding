import React from 'react'
import {connect} from 'react-redux'
import {login} from '../../redux/user'

const LoginForm = props =>{
    return (
        <form onSubmit={props.handleSubmit} id="login">
            <div>
            <div>
                <label htmlFor='Callsign'>Callsign: </label>
                <input type='text' name="Callsign" required />
            </div>
            <div>
                <label htmlFor='password'>Password: </label>
                <input type="password" name="password" required />
            </div>
            <button type='submit'>Login</button>
            </div>
        </form>
    )
}

const mapDispatch = (dispatch, ownProps) => ({
    handleSubmit: event => {
        event.preventDefault()
        const Callsign = event.target.Callsign.value
        const password =event.target.password.value
        const credentials = {Callsign, password}
        dispatch(login(credentials, ownProps.history))
    }

})

export default connect(null, mapDispatch)(LoginForm)