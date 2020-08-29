import React from 'react'
import Badge from './Badge'
import MemberInformation from './MemberInfomation'
import Commitees from './Committees'


class MembershipForm extends React.Component{
    render() {
        return (
            <>
        <div className="Subtitle" >Membership Signup</div>

        <div className="Content">
            <form action="/membership/" method="POST" name="membershipApplication">
            <div >
                <div className="Right">
                    <div><input type="checkbox" name="Desired" /> Club Badge </div>
                    {/* <!--badge section only show up when checked?--> */}
                   <Badge />
                </div>
            </div>
        <div>
        <label>Membership Type: </label>
        <select name="Membership" required>
            <option value="Full" >Regular $26.00 USD</option>
            <option value="Senior">Senior (55+ & retired) $13.00 USD</option>
            <option value="Family">Family $39.00 USD</option>
            <option value="Student">Student $13.00 USD</option>
            <option value="Associate">Associate (No license) $13.00 USD</option>
            <option value="Lifetime">Lifetime</option>
        </select>
        <label>Today's Date: </label><input type="date" required name="date" />
        <label>Due Year: </label><select required name="DueYear">
            <option>2021</option>
            <option>2020</option>
            </select>
               <MemberInformation />
                    {/* <!--additional name,call,email box when family is selected--> */}
            </div>
            
            <hr />
        
           <Commitees />
            <div><input type="submit" style={{textAlign: "center"}} value="Submit" /></div>
           
        </form>
            
        </div></>)
    }
}

export default MembershipForm