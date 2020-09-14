import React from 'react'
import {connect} from 'react-redux'
import { logout, fetchCurrentUser } from '../../redux/user'
import LoginForm from './loginForm'


class MemberPage extends React.Component {
    componentDidMount(){
        this.props.fetchCurrentUser()
    }
    
    render(){
        if (!this.props.user.id) {
            return <LoginForm />
        } else {
           return ( <div>
            <h1>Welcome Back {this.props.user.Callsign}!</h1>
            <button onClick={() => this.props.logout()} >Logout</button>
            </div>
           )
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
        logout: () => dispatch(logout()),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
}

export default connect(mapState, mapDispatch)(MemberPage)