import React from 'react' 
import {Link} from 'react-router-dom'
import AddressBlock from '../AboutUs/addressblock'

//this page is done for now

const Membership = (props) => {
    return (
        <div>
            <div className="Title">Join WCRA</div>

            <div className="Content">
                <p><b>Full WCRA membership</b>
                is open to anyone currently holding an Amateur Radio license of any class who is interested in the science and fraternity of
                amateur radio. <b>Associate membership</b> is open to those who do not currently hold an amateur radio license. Read our 
                 <a href="/Bylaws"> bylaws</a> to see how the club is run.</p>

                <p>Annual dues are $26 for Full Membership, Family Memberships (same household) are $39; Senior Citizens (age 65 and over),
                    Associate memberships are $13 and Student Memberships are $13. Annual dues are due January 1st. Full dues are charged from 
                    January 1 through June 30. Beginning July 1, dues are one half the annual rate (for new members only).</p>

                <p>Membership applications are now being accepted online with this
                    <Link to="/membershipForm"> form</Link> or a hardcopied can be
                printed (via <a href="TextApplication.html">HTML text</a> or <a href="Document/MembershipApplicationEditedB.pdf">PDF</a>) and 
                dues can be brought to a club meeting or mailed to the club at the following address:</p>

                <AddressBlock />
            </div>
        </div>
    )
}

export default Membership;