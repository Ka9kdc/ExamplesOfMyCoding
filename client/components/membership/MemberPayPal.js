import React from 'react';
import { connect } from 'react-redux';
import { payment } from '../../redux/membership';

const MemberPaypal = (props) => {
  // This function displays Smart Payment Buttons on your web page.

  paypal
    .Buttons({
      createOrder: function (data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: props.member.amount,
              },
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
          // This function shows a transaction success message to your buyer.
          props.payment(props.member);
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },
    })
    .render('#paypal-button-container');
  return <div></div>;
};
const mapState = (state) => {
  return {
    member: state.member,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    payment: (memberInfo) => dispatch(payment(memberInfo, ownProps.history)),
  };
};
export default connect(mapState, mapDispatch)(MemberPaypal);
