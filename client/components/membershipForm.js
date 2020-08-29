import React from 'react'
import Badge from './Badge'
import MemberInformation from './MemberInfomation'
import Commitees from './Committees'


class MembershipForm extends React.Component{
    constructor(){
        super()
        this.state = {
            badgeType: '',
            ArrlLogo: false,
            Color: '',
            badgeName: '',
            LicenseYear: 0,
            Membership: '',
            date: '',
            Desired: false,
            DueYear: '2021',

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }

    handleCheckbox(event){
        console.log(event.target.name)
        this.setState({[event.target.name]: !(this.state[event.target.name])})
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <>
        <div className="Subtitle" >Membership Signup</div>

        <div className="Content">
            <form action="/membership/" method="POST" name="membershipApplication">
            <div >
                <div className="Right">
                    <div><input type="checkbox" name="Desired" onChange={this.handleCheckbox}/> Club Badge </div>
                    {/* <!--badge section only show up when checked?--> */}
                    {this.state.Desired ? 
                   <Badge handleChange={this.handleChange} handleCheckbox={this.handleCheckbox} badgeType={this.state.badgeType}/>
                        : ''}
                   </div>
            </div>
        <div>
        <label>Membership Type: </label>
        <select name="Membership" required onChange={this.handleChange} >
            <option value="Full" >Regular $26.00 USD</option>
            <option value="Senior">Senior (55+ & retired) $13.00 USD</option>
            <option value="Family">Family $39.00 USD</option>
            <option value="Student">Student $13.00 USD</option>
            <option value="Associate">Associate (No license) $13.00 USD</option>
            <option value="Lifetime">Lifetime</option>
        </select>
        <label>Today's Date: </label><input type="date" required name="date" onChange={this.handleChange} />
        <label>Due Year: </label><select required name="DueYear" onChange={this.handleChange} >
            <option value='2021'>2021</option>
            <option value='2020'>2020</option>
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