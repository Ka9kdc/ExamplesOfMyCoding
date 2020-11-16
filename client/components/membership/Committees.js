import React from 'react';
import { connect } from 'react-redux';
import { updateMemberCommittees } from '../../redux/membership';

//this page needs redux added

const Committees = (props) => {
  // let committees = Object.keys(props.Committees)

  return (
    <div>
      Please indicate areas where you would like to assist or serve on a
      committee:
      <div id="commiteeSelection" name="Committee">
        {/* {committees.map((committee, i) => {
                if(committee === 'other') {
                    return (<div key={i}>{props.Committees.other !== '' ? <div><input type="checkbox" name={committee} checked />  Other: <input type="text" name="other" onChange={() => props.updateOther()} value={props.Committees.other} /></div>
                    : <div><input type="checkbox" name={committee}   />  Other: <input type="text" name="other" onChange={() => props.updateOther()} value={props.Committees.other} /></div>}</div>)
                }
                return (<div key={i}>{!props.Committees[committee] ? <div><input type="checkbox" name={committee} onChange={() => props.updateCommitteeInfo({[committee]: !props.Committees[committee]})} value={props.Committees[committee]}  /> {committee}</div>
                    : <div><input checked type="checkbox" name={committee} onChange={() => props.updateCommitteeInfo({[committee]: !props.Committees[committee]})} value={props.Committees[committee]} /> {committee}</div>}</div>)
            })} */}

        <div>
          <input
            type="checkbox"
            name="Repeaters"
            onChange={() =>
              props.updateCommitteeInfo({
                Repeater: !props.Committees.Repeater,
              })
            }
            value={props.Committees.Repeater}
          />{' '}
          Repeater Advisory Board
        </div>
        <div>
          <input
            type="checkbox"
            name="MeetingPrograms"
            onChange={() =>
              props.updateCommitteeInfo({
                MeetingPrograms: !props.Committees.MeetingPrograms,
              })
            }
            value={props.Committees.MeetingPrograms}
          />{' '}
          Meeting Programs
        </div>
        <div>
          <input
            type="checkbox"
            name="ClubOfficer"
            onChange={() =>
              props.updateCommitteeInfo({
                ClubOfficer: !props.Committees.ClubOfficer,
              })
            }
            value={props.Committees.ClubOfficer}
          />{' '}
          Club Officer
        </div>
        <div>
          <input
            type="checkbox"
            name="MembershipCommittee"
            onChange={() =>
              props.updateCommitteeInfo({
                MembershipCommittee: !props.Committees.MembershipCommittee,
              })
            }
            value={props.Committees.MembershipCommittee}
          />{' '}
          Membership
        </div>
        <div>
          <input
            type="checkbox"
            name="PublicService"
            onChange={() =>
              props.updateCommitteeInfo({
                PublicService: !props.Committees.PublicService,
              })
            }
            value={props.Committees.PublicService}
          />{' '}
          Public Service Events
        </div>
        <div>
          <input
            type="checkbox"
            name="FieldDay"
            onChange={() =>
              props.updateCommitteeInfo({
                FieldDay: !props.Committees.FieldDay,
              })
            }
            value={props.Committees.FieldDay}
          />{' '}
          Field Day (June)
        </div>
        <div>
          <input
            type="checkbox"
            name="Fundraising"
            onChange={() =>
              props.updateCommitteeInfo({
                Fundraising: !props.Committees.Fundraising,
              })
            }
            value={props.Committees.Fundraising}
          />{' '}
          Fundraising
        </div>
        <div>
          <input
            type="checkbox"
            name="VEtesting"
            onChange={() =>
              props.updateCommitteeInfo({
                VEtesting: !props.Committees.VEtesting,
              })
            }
            value={props.Committees.VEtesting}
          />{' '}
          VE Testing
        </div>
        <div>
          <input
            type="checkbox"
            name="Training"
            onChange={() =>
              props.updateCommitteeInfo({
                Training: !props.Committees.Training,
              })
            }
            value={props.Committees.Training}
          />{' '}
          Training/Elmering
        </div>
        <div>
          <input
            type="checkbox"
            name="Net"
            onChange={() =>
              props.updateCommitteeInfo({ Net: !props.Committees.Net })
            }
            value={props.Committees.Net}
          />{' '}
          On-Air Networks
        </div>
        <div>
          <input
            type="checkbox"
            name="csuTrailer"
            onChange={() =>
              props.updateCommitteeInfo({
                csuTrailer: !props.Committees.csuTrailer,
              })
            }
            value={props.Committees.csuTrailer}
          />{' '}
          CSU Trailer
        </div>
        <div>
          <input
            type="checkbox"
            name="Publicity"
            onChange={() =>
              props.updateCommitteeInfo({
                Publicity: !props.Committees.Publicity,
              })
            }
            value={props.Committees.Publicity}
          />{' '}
          Publicity
        </div>
        <div>
          <input
            type="checkbox"
            name="Hamfest"
            onChange={() =>
              props.updateCommitteeInfo({ Hamfest: !props.Committees.Hamfest })
            }
            value={props.Committees.Hamfest}
          />{' '}
          Hamfest (January)
        </div>
        <div>
          <input
            type="checkbox"
            name="YouthPrograms"
            onChange={() =>
              props.updateCommitteeInfo({
                YouthPrograms: !props.Committees.YouthPrograms,
              })
            }
            value={props.Committees.YouthPrograms}
          />{' '}
          Youth Programs
        </div>
        <div>
          <input
            type="checkbox"
            name="HamLetter"
            onChange={() =>
              props.updateCommitteeInfo({
                HamLetter: !props.Committees.HamLetter,
              })
            }
            value={props.Committees.HamLetter}
          />{' '}
          Newsletter
        </div>
        <div>
          <input
            type="checkbox"
            name="Website"
            onChange={() =>
              props.updateCommitteeInfo({ Website: !props.Committees.Website })
            }
            value={props.Committees.Website}
          />{' '}
          Website
        </div>
        <div>
          <input type="checkbox" /> Other:{' '}
          <input
            type="text"
            name="other"
            onChange={() => props.updateOther()}
            value={props.Committees.other}
          />
        </div>
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    Committees: state.member.committees,
  };
};
const mapDispatch = (dispatch) => {
  return {
    updateCommitteeInfo: (update) => dispatch(updateMemberCommittees(update)),
    updateOther: () =>
      dispatch(updateMemberCommittees({ other: event.target.value })),
  };
};

export default connect(mapState, mapDispatch)(Committees);
