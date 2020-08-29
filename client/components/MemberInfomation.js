import React from 'react'
import States from './states'

//this page needs redux added

const MemberInformation = (props) =>{
    return (
        <div>
            <p>First Name:  <input name="FirstName" placeholder="First Name" required=""  type="text" /> 
            Last Name:  <input name="LastName" placeholder="Last Name" required=""  type="text" />
            Callsign:<input name="Callsign" placeholder="callsign"  type="text" required /> </p>
            <p>Email:  <input name="email" placeholder="Your email here (required)" required="" size="48" type="email" required/></p>
            <p>Phone Number:  <input name="day_phone_a" placeholder="000-000-0000" size="15" type="tel" required/></p>
            <p>Street Address:  <input name="address1" placeholder="Street" type="text" size="40%" required/></p>
            <p>City:  <input name="city" placeholder="City" type="text" required /> 
            State:  <States />
             Zip Code:  <input name="zip" placeholder="00000" size="5" type="text" required/></p>
     </div>
    )
}

export default MemberInformation