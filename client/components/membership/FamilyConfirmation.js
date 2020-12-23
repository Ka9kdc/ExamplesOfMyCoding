import React from 'react';
import { connect } from 'react-redux';
import Badge from './Badge';
import Committees from './Committees';
import MemberInfomation from './MemberInfomation';
import MemberPaypal from './MemberPayPal';
import {
  submitFamilyMember,
  updateMemberBadge,
  updateMemberInfo,
} from '../../redux/membership';

class FamilyConfirmation extends React.Component {
  constructor() {
    super();
    this.state = {
     addingMore:true
    };
    this.handleChange = this.handleChange.bind(this);
    this.FamilyFinal = this.FamilyFinal.bind(this);
  }

  handleChange(event) {
    this.props.updateMemberInfo({ [event.target.name]: event.target.value });
  }

  FamilyFinal() {
    this.props.submitFamilyMember(this.props.member);
    this.setState({ addingMore:false });
  }

  render() {
    console.log(this.props.history);
    const { badge, contact, amount } = this.props.member;
    return (
      <div>
        <div className="Subtitle">
          Family Membership: The {contact.LastName} Family
        </div>

        <div className="Content">
          <h2>
            {contact.Membership} membership for {contact.DueYear} is ${amount}.
          </h2>
          {contact.FamilyMembers.map((member) => (
            <h3 key={member.id} className="form">
              <div>
                Member: {member.FirstName}, {member.Callsign}
              </div>
              <div>Phone: {member.Phone}</div>
              <div>Email: {member.Email}</div>
            </h3>
          ))}
          {this.state.addingMore ? (
            <div>
              <h2>Next Member:</h2>
              <div className="Right">
                {badge.Desired ? (
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        name="Desired"
                        onChange={() =>
                          this.props.getBadge({ Desired: !badge.Desired })
                        }
                        defaultChecked
                      />{' '}
                      Get A Club Badge{' '}
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
                        this.props.getBadge({ Desired: !badge.Desired })
                      }
                    />{' '}
                    Get A Club Badge{' '}
                  </div>
                )}
              </div>
              <MemberInfomation />
              <Committees />
              <div>
                <button
                  type="button"
                  onClick={() =>
                    this.props.submitFamilyMember(this.props.member)
                  }
                >
                  Add Another Member
                </button>
                <button type="button" onClick={() => this.FamilyFinal()}>
                  Submit Last Member and Pay
                </button>
              </div>
            </div>
          ) : (
            <div>
              <MemberPaypal history={this.props.history} />
            </div>
          )}
          <div id="paypal-button-container" />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    member: state.member,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateMemberInfo: (memberInfo) => dispatch(updateMemberInfo(memberInfo)),
    submitFamilyMember: (memberInfo) =>
      dispatch(submitFamilyMember(memberInfo)),
    getBadge: (desire) => dispatch(updateMemberBadge(desire)),
  };
};

export default connect(mapState, mapDispatch)(FamilyConfirmation);
