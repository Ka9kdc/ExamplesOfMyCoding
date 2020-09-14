import React from 'react'
import {connect} from 'react-redux'
import Badge from './Badge'
import MemberInformation from './MemberInfomation'
import Commitees from './Committees'
import { submitMember, updateMemberInfo, submitFamilyMember, updateMemberBadge } from '../../redux/membership'


class MembershipForm extends React.Component{
    constructor(){
        super()    
        this.state ={
            familyCount: 1,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addFamilyMember = this.addFamilyMember.bind(this)
    }


    handleChange(event){
        console.log(event.target.value)
        this.props.updateMemberInfo({[event.target.name]: event.target.value})
    }

    handleSubmit(){
        event.preventDefault()
        console.log('submit')
        if(this.state.familyCount >= 2) {
            this.props.submitFamilyMember(this.props.all)
        }
        this.props.submitMember(this.props.all)
    }

    addFamilyMember(){
        event.preventDefault()
        console.log('family')
        const newCount = this.state.familyCount + 1
        this.setState({familyCount: newCount })
        this.props.submitFamilyMember(this.props.all)
    }
    

    render() {
        console.log(this.props.member)
        return (
            <>
        <div className="Subtitle" >Membership Signup</div>

        <div className="Content">

            <div >
                <div className="Right">
                    <div><input type="checkbox" name="Desired" onChange={() => this.props.getBadge({Desired: !this.props.Desired})}/> Get A Club Badge </div>
                    {/* <!--badge section only show up when checked?--> */}
                    {this.props.Desired ? 
                   <Badge />
                        : ''}
                   </div>
            </div>
        <div className='form'>
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
            </div>
            <div><label>Today's Date: </label><input type="date" required name="RenewalDate" onChange={this.handleChange} /></div>
            <div><label>Due Year: </label>
                <select required name="DueYear" onChange={this.handleChange} >
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                </select>
            </div>
        
        
            {this.props.member.Membership === 'Lifetime' ? <h2 style={{color: 'red'}}>
                Your Lifetime Membership status will be verified by the Club sectertary at the next meeting before your renewal will accepted. 
                </h2>: ''}
               <MemberInformation />
                    {/* <!--additional name,call,email box when family is selected--> */}
            </div>
            
            <hr />
        
           <Commitees />
            <div>
            
           {this.props.member.Membership === 'Family' ?  <button type="button" style={{textAlign: "center"}} onClick={() => this.addFamilyMember()}>Add Family Member</button> : ''}
           {this.props.member.Membership !== 'Family' || this.state.familyCount > 1 ? <button type="button" style={{textAlign: "center"}} onClick={() => this.handleSubmit()}>Submit Form</button> : ''}
                </div>
           
       
            
        </div></>)
    }
}

const mapState = state =>{
    return {
        member: state.member.contact,
        Desired: state.member.badge.Desired,
        all:state.member
    }
}

const mapDispatch = dispatch => {
    return {
        submitMember: (memberInfo) => dispatch(submitMember(memberInfo)),
        updateMemberInfo: (memberInfo) => dispatch(updateMemberInfo(memberInfo)),
        submitFamilyMember: (memberInfo) => dispatch(submitFamilyMember(memberInfo)),
        getBadge: (desire) => dispatch(updateMemberBadge(desire))
    }
}

export default connect(mapState, mapDispatch)(MembershipForm)