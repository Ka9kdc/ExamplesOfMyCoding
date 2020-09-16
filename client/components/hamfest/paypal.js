import React from 'react'
import {connect} from 'react-redux'
import { useHistory } from 'react-router-dom';
import {hamfestPayment} from '../../redux/customer'


const Paypal = (props) => {
        let history = useHistory()
     // This function displays Smart Payment Buttons on your web page.

    paypal.Buttons( {createOrder: function(data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: props.total
            }
          }]
        });
      },
      onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {
          // This function shows a transaction success message to your buyer.
          props.payment(props.customer, history)
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container')
    return <div></div>
}
const mapState = state =>{
    return {
        total: state.cart.total,
        customer: state.customerInfo
    }
}

const mapDispatch = (dispatch) => {
  return {
      payment: (customerInfo, history) => dispatch(hamfestPayment(customerInfo, history))
  }
}
export default connect(mapState, mapDispatch)(Paypal)