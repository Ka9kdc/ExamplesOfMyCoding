import React from 'react'
import {connect} from 'react-redux'
import { logout } from '../../redux/user'
import LoginForm from './loginForm'


class MemberPage extends React.Component {
    render(){
        if (!this.props.user.id) {
            return <LoginForm />
        } else {
            <div>
            <hi>Welcome Back {this.props.user.email}!</hi>
            <button onClick={() => this.props.logout()} >Logout</button>
            </div>
        }
        
    }
}

const mapState = state => {
    return {
        user:state.user
    }
}

const mapDispatch = dispatch =>{
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapState, mapDispatch)(MemberPage)