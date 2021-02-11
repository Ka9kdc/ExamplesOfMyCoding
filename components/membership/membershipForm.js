import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import MemberInformation from './MemberInfomation';
import Commitees from './Committees';
import {
  submitMember,
  updateMemberInfo,
  submitFamilyMember,
  updateMemberBadge,
} from '../../reduxStore/membership';

class MembershipForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFamilyMember = this.addFamilyMember.bind(this);
  }

  handleChange(event) {
    this.props.updateMemberInfo({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    event.preventDefault();
    this.props.submitMember(this.props.all);
  }

  addFamilyMember() {
    this.props.submitFamilyMember(this.props.all);
  }

  render() {
    return (
      <>
        <div className="Subtitle">Membership Signup</div>

        <div className="Content">
          <div className="Right">
            {this.props.Desired ? (
              <div>
                <div>
                  <input
                    type="checkbox"
                    name="Desired"
                    onChange={() =>
                      this.props.getBadge({ Desired: !this.props.Desired })
                    }
                    defaultChecked
                  />
                  <label htmlFor="Desired">Get A Club Badge</label>
                </div>
                {/* <!--badge section only show up when checked?--> */}

                <Badge />
              </div>
            ) : (
              <div>
                <input
                  type="checkbox"
                  name="Desired"
                  onChange={() =>
                    this.props.getBadge({ Desired: !this.props.Desired })
                  }
                />
                <label htmlFor="Desired">Get A Club Badge</label>
              </div>
            )}
          </div>
          <div className="form">
            <div>
              <label htmlFor="MembershipType">Membership Type: </label>
              <select name="Membership" required onChange={this.handleChange}>
                <option value="Full">Regular $26.00 USD</option>
                <option value="Senior">
                  Senior (55+ & retired) $13.00 USD
                </option>
                <option value="Family">Family $39.00 USD</option>
                <option value="Student">Student $13.00 USD</option>
                <option value="Associate">
                  Associate (No license) $13.00 USD
                </option>
                <option value="Lifetime">Lifetime</option>
              </select>
            </div>
            <div>
              <label htmlFor="todaysDate">Today's Date: </label>
              <input
                type="date"
                required
                name="RenewalDate"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="DueYear">Due Year: </label>
              <select required name="DueYear" onChange={this.handleChange}>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>

            {this.props.member.Membership === 'Lifetime' ? (
              <h2 style={{ color: 'red' }}>
                Your Lifetime Membership status will be verified by the Club
                sectertary at the next meeting before your renewal will
                accepted.
              </h2>
            ) : (
              ''
            )}
            <MemberInformation />
            {/* <!--additional name,call,email box when family is selected--> */}
          </div>

          <hr />

          <Commitees />
          <div>
            {this.props.member.Membership === 'Family' ? (
              <Link to="/membershipConfirmation">
                <button
                  type="button"
                  style={{ textAlign: 'center' }}
                  onClick={() => this.addFamilyMember()}
                >
                  Add Family Member
                </button>
              </Link>
            ) : (
              <button
                type="button"
                style={{ textAlign: 'center' }}
                onClick={() => this.handleSubmit()}
              >
                Submit Form
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    member: state.member.contact,
    Desired: state.member.badge.Desired,
    all: state.member,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    submitMember: (memberInfo) =>
      dispatch(submitMember(memberInfo, ownProps.history)),
    updateMemberInfo: (memberInfo) => dispatch(updateMemberInfo(memberInfo)),
    submitFamilyMember: (memberInfo) =>
      dispatch(submitFamilyMember(memberInfo)),
    getBadge: (desire) => dispatch(updateMemberBadge(desire)),
  };
};

export default connect(mapState, mapDispatch)(MembershipForm);
