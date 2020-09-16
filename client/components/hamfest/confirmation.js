import React from 'react'
import {connect} from 'react-redux'
import PayPal from './paypal'
import Order from './Order'

const HamfestConfirmation = (props) => {
    console.log(props.customer)
    const keys = Object.keys(props.customer)
    return (
        <>
        <div className="Subtitle" >Hamfest Checkout </div>

        <div className="Content">
        <div> 
            <form >
                
                <div><Order /></div>
                {keys.map(key => {
                    let noShow = ['order', 'id', 'ticketId', 'orderID']
                    if(noShow.indexOf(key) === -1 && props.customer[key] !== '') {
                        return <h2 key={key}>{key}: {props.customer[key]}</h2>
                    }
                })}
                <div id="paypal-button-container"></div>
                <PayPal />
                

            </form>
        </div>
        </div>
        </>
    )
}

const mapState = state => {
    return {
        customer: state.customerInfo
    }
}

export default connect(mapState)(HamfestConfirmation)