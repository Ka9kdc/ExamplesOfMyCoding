import React from 'react'
import {connect} from 'react-redux'
import { setAmount, payment, submitFamilyMember, updateMemberBadge, updateMemberInfo } from '../../redux/membership'
import Badge from './Badge'
import Committees from './Committees'
import MemberInfomation from './MemberInfomation'
import MemberPaypal from './MemberPayPal'

class MemberConfirmation extends React.Component {
    constructor(){
        super()
        this.state ={
            readyToPay: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.FamilyFinal = this.FamilyFinal.bind(this)
    }

    componentDidMount(){
        this.props.setAmount(this.props.member.contact.Membership)
        if(this.props.member.contact.Membership !== 'Family') {
            this.setState({readyToPay: true})
        }
    }

    handleChange(event){
        this.props.updateMemberInfo({[event.target.name]: event.target.value})
    }

    FamilyFinal(){
        console.log('hello')
        this.props.submitFamilyMember(this.props.member)
        this.setState({readyToPay: true})
    }

    render(){
        const {badge, contact, committees, amount} = this.props.member
        const groups = Object.keys(committees).filter(group => committees[group])
        if(contact.FamilyMembers.length){
           return (
           <div>
                <div className="Subtitle" >Family Membership: The {contact.LastName} Family</div>

               <div className="Content">
                <div>{contact.Membership} membership for {contact.DueYear} is ${amount}.</div>
                {contact.FamilyMembers.map(member => (
                    <div key={member.id}>
                        <div>Member: {member.FirstName}, {member.Callsign}</div>
                        <div>Phone: {member.Phone}</div>
                        <div>Email: {member.Email}</div>
                        </div>
                ))}
                {!this.state.readyToPay ?
                <div>
                    <div>Next Member:</div>
                        <div className="Right">
                            {badge.Desired 
                            ? <div>
                                <div><input type="checkbox" name="Desired" onChange={() => this.props.getBadge({Desired: !badge.Desired})} defaultChecked/> Get A Club Badge </div>
                                {/* <!--badge section only show up when checked?--> */}
                                
                                <Badge />
                            </div>
                            : <div><input type="checkbox" name="Desired" onChange={() => this.props.getBadge({Desired: !badge.Desired})}/> Get A Club Badge </div>}
                            
                        </div>
                        <MemberInfomation />
                        <Committees />
                        <div>
                            <button type="button" onClick={() => this.props.submitFamilyMember(this.props.member)} >Add Another Member</button>
                            <button type="button" onClick={() => this.FamilyFinal()} >Submit Last Member and Pay</button>
                        </div>
                    </div>
                    : <MemberPaypal history={this.props.history}/> }
                <div id="paypal-button-container"></div></div> 
           </div>
            )
        } else {
            return (
                <div>
                     <div className="Subtitle" >Membership Confirmation For {contact.FirstName} {contact.LastName}</div>     
                     <div>{contact.Membership} membership for {contact.DueYear} is ${amount}.</div>
                     <div>Name: {contact.FirstName} {contact.LastName}, {contact.Callsign}</div>
                     <div>Phone: {contact.Phone}</div>
                     <div>Email: {contact.Email}</div>
                     <div>Address: {contact.Street}</div>
                     <div>{contact.City}, {contact.State} {contact.Zip}</div>
                     <div>Badge: 
                         {badge.Desired ?
                         <div>
                         <div>License Year: {badge.LicenseYear}</div>
                         <div>Name on Badge: {badge.badgeName}</div>
                         <div>Arrl Logo: {badge.ArrlLogo ? 'Yes' : 'No'}</div>
                         <div>Badge Type: {badge.badgeType}</div>
                         {badge.badgeType === 'Landyard' ? <div>Landyard Color: {badge.Color}</div> : ''}
                         </div>
                         : 'None'}
                     </div>
                     <div>Committee Involvement:
                         {groups.length ? groups.map((group, idx) => <div key={idx}>{group}</div>) : 'None'}
                     </div>
                     {contact.Membership === 'Lifetime' ? <button type="button" onClick={() => this.props.lifetimePayment(this.props.member)}>Confirm Membership Renewal</button>
                        :<div id="paypal-button-container"></div>} {this.state.readyToPay &&  contact.Membership !== 'Lifetime' ? <MemberPaypal history={this.props.history} /> : ''}

                </div>
            )
        }
    }
}

const mapState = state => {
    return {
        member: state.member
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        updateMemberInfo: (memberInfo) => dispatch(updateMemberInfo(memberInfo)),
        submitFamilyMember: (memberInfo) => dispatch(submitFamilyMember(memberInfo)),
        getBadge: (desire) => dispatch(updateMemberBadge(desire)),
        setAmount: (MembershipType) => dispatch(setAmount(MembershipType)),
        lifetimePayment: (memberInfo) => dispatch(payment(memberInfo, ownProps.history))
    }
}

export default connect(mapState, mapDispatch)(MemberConfirmation)