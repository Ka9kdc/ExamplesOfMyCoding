import React from 'react';

//this page needs redux added

const Commitees = (props) =>{
    return ( <div>
        Please indicate areas where you would like to assist or serve on a committee:
       
        <div id="commiteeSelection" name="Committee">
        <div><input type="checkbox" name="Repeaters" /> Repeater Advisory Board</div>
        <div><input type="checkbox" name="MeetingPrograms" /> Meeting Programs</div>
        <div><input type="checkbox" name="ClubOfficer" /> Club Officer</div>
        <div><input type="checkbox" name="MembershipCommittee" /> Membership</div>
        <div><input type="checkbox" name="PublicService" /> Public Service Events</div>
        <div><input type="checkbox" name="FieldDay" /> Field Day (June)</div>
        <div><input type="checkbox" name="Fundraising" /> Fundraising</div>
        <div><input type="checkbox" name="VEtesting" /> VE Testing</div>
        <div><input type="checkbox" name="Training" /> Training/Elmering</div>
        <div><input type="checkbox" name="Net" /> On-Air Networks</div>
        <div><input type="checkbox" name="csuTrailer" /> CSU Trailer</div>
        <div><input type="checkbox" name="Publicity" /> Publicity</div>
        <div><input type="checkbox" name="Hamfest" /> Hamfest (January)</div>
        <div><input type="checkbox" name="YouthPrograms" /> Youth Programs</div>
        <div><input type="checkbox" name="HamLetter" /> Newsletter</div>
        <div><input type="checkbox" name="Website" /> Website</div>
        <div><input type="checkbox" /> Other: <input type="text" name="other" /></div></div> </div>
        )
}

export default Commitees