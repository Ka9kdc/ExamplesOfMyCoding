import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAmount } from '../../redux/membership';
import SingleMemberConfirmation from './SingleMemberConfirmation';
import FamilyConfirmation from './FamilyConfirmation';

const MemberConfirmation = (props) => {
  useEffect(() => {
    props.setAmount(props.contact.Membership);
  });
  if (props.contact.Membership === 'Family') {
    return <FamilyConfirmation history={props.history}/>;
  } else {
    return <SingleMemberConfirmation history={props.history}/>;
  }
};

const mapState = (state) => {
  return {
    contact: state.member.contact,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setAmount: (MembershipType) => dispatch(setAmount(MembershipType)),
  };
};

export default connect(mapState, mapDispatch)(MemberConfirmation);
