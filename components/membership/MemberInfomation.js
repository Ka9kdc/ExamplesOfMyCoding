import React from 'react';
import States from '../states';
import { connect } from 'react-redux';
import { updateMemberInfo } from '../../reduxStore/membership';

//this page needs redux added

const MemberInformation = (props) => {
  return (
    <div className="form">
      <div>
        <label htmlFor="FirstName">First Name: </label>
        <input
          name="FirstName"
          value={props.member.FirstName}
          placeholder="First Name"
          required
          type="text"
          onChange={() => props.handleChange(event)}
        />
      </div>
      <div>
        {' '}
        <label htmlFor="LastName">Last Name: </label>
        <input
          name="LastName"
          value={props.member.LastName}
          placeholder="Last Name"
          required
          type="text"
          onChange={() => props.handleChange(event)}
        />
      </div>
      <div>
        <label htmlFor="Callsign">Callsign: </label>
        <input
          name="Callsign"
          value={props.member.Callsign}
          placeholder="Callsign"
          type="text"
          required
          onChange={() => props.handleChange(event)}
        />
      </div>
      <div>
        <label htmlFor="Email">Email: </label>
        <input
          name="Email"
          value={props.member.Email}
          placeholder="Your email here (required)"
          required
          size="48"
          type="email"
          onChange={() => props.handleChange(event)}
        />
      </div>
      <div>
        <label htmlFor="Phone">Phone Number: </label>
        <input
          name="Phone"
          value={props.member.Phone}
          placeholder="000-000-0000"
          size="15"
          type="tel"
          required
          onChange={() => props.handleChange(event)}
        />
      </div>
      <div>
        <label htmlFor="Street">Street Address: </label>
        <input
          name="Street"
          type="text"
          size="40%"
          value={props.member.Street}
          required
          // size="48"
          onChange={() => props.handleChange(event)}
        />
      </div>
      <div>
        <label htmlFor="City">City: </label>
        <input
          name="City"
          placeholder="City"
          value={props.member.City}
          type="text"
          required
          onChange={() => props.handleChange(event)}
        />
      </div>
      <div>
        <label htmlFor="State">State: </label>
        <States state={props.member.State} handleChange={props.handleChange} />
      </div>
      <div>
        <label htmlFor="Zip">Zip Code: </label>{' '}
        <input
          name="Zip"
          value={props.member.Zip}
          type="text"
          required
          onChange={() => props.handleChange(event)}
        />
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    member: state.member.contact,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleChange: (event) =>
      dispatch(updateMemberInfo({ [event.target.name]: event.target.value })),
  };
};
export default connect(mapState, mapDispatch)(MemberInformation);
