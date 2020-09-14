import React from 'react'
import MembershipForm from './membershipForm'
import {connect} from 'react-redux'

class MemberConfirmation extends React.Component {
    render(){

    }
}

const mapState = state => {
    return {
        member: state.member
    }
}