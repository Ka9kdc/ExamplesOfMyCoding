import React, { useState } from 'react';
import { connect } from 'react-redux';
import MemberPaypal from './MemberPayPal';
import { setAmount, payment } from '../../redux/membership';

const SingleMemberConfirmation = (props) => {
  const { badge, contact, committees, amount } = props.member;
  const groups = Object.keys(committees).filter((group) => committees[group]);

  return (
    <>
      <div className="Subtitle">
        Membership Confirmation For {contact.FirstName} {contact.LastName}
      </div>
      <div className="Content">
        <h2>
          {' '}
          {contact.Membership} membership for {contact.DueYear} is ${amount}.
        </h2>
        <div>
          Name: {contact.FirstName} {contact.LastName}, {contact.Callsign}
        </div>
        <div>Phone: {contact.Phone}</div>
        <div>Email: {contact.Email}</div>
        <div className="form">
          <div>Address: </div>
          <div>
            <div>{contact.Street}</div>
            <div>
              {contact.City}, {contact.State} {contact.Zip}
            </div>
          </div>
        </div>
        <div className="form">
          Badge:
          {badge.Desired ? (
            <div>
              <div>License Year: {badge.LicenseYear}</div>
              <div>Name on Badge: {badge.badgeName}</div>
              <div>Arrl Logo: {badge.ArrlLogo ? 'Yes' : 'No'}</div>
              <div>Badge Type: {badge.badgeType}</div>
              {badge.badgeType === 'Landyard' ? (
                <div>Landyard Color: {badge.Color}</div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ' None'
          )}
        </div>
        <div className="form">
          <div>Committee Involvement: </div>
          <div>
            {groups.length
              ? groups.map((group) => <div key={group}>{group}</div>)
              : 'None'}
          </div>
        </div>
        {contact.Membership === 'Lifetime' ? (
          <button
            type="button"
            onClick={() => props.lifetimePayment(props.member)}
          >
            Confirm Membership Renewal
          </button>
        ) : (
          <>
          <div id="paypal-button-container" />
          <MemberPaypal history={props.history} />
          </>
        )}
      </div>
    </>
  );
};

const mapState = (state) => {
  return {
    member: state.member,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  console.log(ownProps)
  return {
    setAmount: (MembershipType) => dispatch(setAmount(MembershipType)),
    lifetimePayment: (memberInfo) =>
      dispatch(payment(memberInfo, ownProps.history)),
  };
};

export default connect(mapState, mapDispatch)(SingleMemberConfirmation);
