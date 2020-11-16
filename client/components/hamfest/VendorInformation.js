import React from 'react';
import States from '../states';
import { connect } from 'react-redux';
import {
  updateCustomerInfo,
  submitAttendee,
  submitVendor,
} from '../../redux/customer';
import Paypal from './paypal';

class VendorInfromation extends React.Component {
  constructor() {
    super();
    this.state = {
      readyToPay: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.update({ [event.target.name]: event.target.value });
  }

  handleSubmit(event, newVendor) {
    event.preventDefault();
    this.setState({ readyToPay: true });
    if (newVendor) {
      this.props.submitVendor(this.props.customerInfo);
    } else {
      this.props.submitAttendee(this.props.customerInfo);
    }
  }

  render() {
    const cart = this.props.cartItems.reduce((names, item) => {
      names.push(item.dataName);
      return names;
    }, []);
    const newVendor = cart.indexOf('Tables') !== -1;

    return (
      <div>
        <h2>
          Thank You {newVendor ? 'Vendor' : ''} for your interest in the WCRA
          Hamfest
        </h2>
        <span style={{ color: 'red' }}>
          Warning refreshing the page will emtpy your cart
        </span>
        <h3>Please provide your contact information below.</h3>
        <div>
          <div>
            <label>Name: </label>{' '}
            <input
              name="Name"
              placeholder="Name"
              type="text"
              size="50"
              value={this.props.customerInfo.Name}
              onChange={() => this.handleChange(event)}
            />
            <label> Callsign: </label>
            <input
              name="Callsign"
              placeholder="callsign"
              type="text"
              size="10"
              value={this.props.customerInfo.Callsign}
              onChange={() => this.handleChange(event)}
            />
          </div>
          <div>
            <label> Company: </label>
            <input
              name="Company"
              placeholder="Company"
              type="text"
              size="50"
              value={this.props.customerInfo.Company}
              onChange={() => this.handleChange(event)}
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              name="Email"
              placeholder="Your email here (required)"
              size="50"
              type="email"
              value={this.props.customerInfo.Email}
              onChange={() => this.handleChange(event)}
            />
            <label> Phone Number: </label>{' '}
            <input
              name="Phone"
              placeholder="000-000-0000"
              type="tel"
              size="15"
              value={this.props.customerInfo.Phone}
              onChange={() => this.handleChange(event)}
            />
          </div>
          <div>
            <label>Street Address: </label>
            <input
              name="Street"
              placeholder="Street"
              type="text"
              size="50"
              value={this.props.customerInfo.Street}
              onChange={() => this.handleChange(event)}
            />
          </div>
          <div>
            <label> City: </label>{' '}
            <input
              name="City"
              placeholder="City"
              type="text"
              value={this.props.customerInfo.City}
              onChange={() => this.handleChange(event)}
            />
            <label> State: </label>{' '}
            <States
              state={this.props.customerInfo.State}
              handleChange={this.handleChange}
            />
            <label> Zip Code: </label>{' '}
            <input
              name="Zip"
              placeholder="00000"
              type="text"
              size="5"
              value={this.props.customerInfo.Zip}
              onChange={() => this.handleChange(event)}
            />
          </div>
          <div>
            {newVendor ? (
              <div>
                <label>Special Requests: </label>
                <textarea
                  name="SpecialRequests"
                  cols="50"
                  value={this.props.customerInfo.SpecialRequests}
                  onChange={() => this.handleChange(event)}
                ></textarea>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div>
          <p>
            Clicking Place order will take you to PayPal to pay. Please verify
            your contact information is currect before click Place Order. Your
            order will not be consider placed until payment has been received.
          </p>
          <button
            type="button"
            onClick={() => this.handleSubmit(event, newVendor)}
          >
            Place order
          </button>
        </div>
        {this.state.readyToPay ? <Paypal /> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cart,
    cartTotal: state.cart.total,
    customerInfo: state.customerInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (newCustomerInfo) => dispatch(updateCustomerInfo(newCustomerInfo)),
    submitVendor: (vendorInfo) => dispatch(submitVendor(vendorInfo)),
    submitAttendee: (attendeeInfo) => dispatch(submitAttendee(attendeeInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorInfromation);

// const inputValidator = (input) => {
//     let inputs = Object.keys(input)
//     if('phone') input.phone.test(/((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/i)
//     if('zip') input.zip.text(/^[0-9]{5}(-[0-9]{4})?$/)

// //address regEx /^\s*((?:(?:\d+(?:\x20+\w+\.?)+(?:(?:\x20+STREET|ST|DRIVE|DR|AVENUE|AVE|ROAD|RD|LOOP|COURT|CT|CIRCLE|LANE|LN|BOULEVARD|BLVD)\.?)?)|(?:(?:P\.\x20?O\.|P\x20?O)\x20*Box\x20+\d+)|(?:General\x20+Delivery)|(?:C[\\\/]O\x20+(?:\w+\x20*)+))\,?\x20*(?:(?:(?:APT|BLDG|DEPT|FL|HNGR|LOT|PIER|RM|S(?:LIP|PC|T(?:E|OP))|TRLR|UNIT|\x23)\.?\x20*(?:[a-zA-Z0-9\-]+))|(?:BSMT|FRNT|LBBY|LOWR|OFC|PH|REAR|SIDE|UPPR))?)\,?\s+((?:(?:\d+(?:\x20+\w+\.?)+(?:(?:\x20+STREET|ST|DRIVE|DR|AVENUE|AVE|ROAD|RD|LOOP|COURT|CT|CIRCLE|LANE|LN|BOULEVARD|BLVD)\.?)?)|(?:(?:P\.\x20?O\.|P\x20?O)\x20*Box\x20+\d+)|(?:General\x20+Delivery)|(?:C[\\\/]O\x20+(?:\w+\x20*)+))\,?\x20*(?:(?:(?:APT|BLDG|DEPT|FL|HNGR|LOT|PIER|RM|S(?:LIP|PC|T(?:E|OP))|TRLR|UNIT|\x23)\.?\x20*(?:[a-zA-Z0-9\-]+))|(?:BSMT|FRNT|LBBY|LOWR|OFC|PH|REAR|SIDE|UPPR))?)?\,?\s+((?:[A-Za-z]+\x20*)+)\,\s+(A[LKSZRAP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])\s+(\d+(?:-\d+)?)\s*$/
// }
