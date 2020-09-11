import React from 'react'
import States from '../states'
import {connect} from 'react-redux'

//this page needs redux added

const MemberInformation = (props) =>{
    return (
        <div>
            <p><label htmlFor="FirstName">First Name:  </label><input name="FirstName" value={props.member.FirstName} placeholder="First Name" required  type="text" /> 
            <label htmlFor="LastName">Last Name:  </label><input name="LastName" value={props.member.LastName} placeholder="Last Name" required type="text" />
            <label htmlFor="CallSign">Callsign:</label><input name="Callsign" value={props.member.Callsign} placeholder="callsign"  type="text" required /> </p>
            <p><label htmlFor="Email">Email:  </label><input name="Email" value={props.member.Email} placeholder="Your email here (required)" required size="48" type="email" required/></p>
            <p><label htmlFor="Phone">Phone Number:  </label><input name="Phone" value={props.member.Phone} placeholder="000-000-0000" size="15" type="tel" required/></p>
            <p><label htmlFor="Street">Street Address:  </label><input name="Street" type="text" size="40%" value={props.member.Street} required/></p>
            <p><label htmlFor="City">City:  </label><input name="City" placeholder="City" value={props.member.City} type="text" required /> 
            <label htmlFor="State">State:  </label><States state={props.member.State} />
            <label htmlFor="Zip">Zip Code:  </label> <input name="Zip" value={props.member.Zip} type="text" required/></p>
     </div>
    )
}
const mapState = state => {
    return {
        member: state.member.contact
    }
}
export default connect(mapState)(MemberInformation)