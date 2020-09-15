import axios from 'axios'
import { useHistory } from 'react-router-dom'




const initialState = {
    badge: {
        Desired: false,
        badgeType: 'NoPreference',
        ArrlLogo: false,
        Color: '',
        badgeName: '',
        LicenseYear: 2020,
    },
    contact: {
        FirstName: '',
        LastName: '',
        Callsign: '',
        Phone: '',
        Street: '',
        City: 'Wheaton',
        State: 'IL',
        Zip: 60187,
        Membership: 'Full',
        Email: '',
        RenewalDate: '',
        DueYear: '2021',
        FamilyMembers: []
    },
    committees: {
        Hamfest: false,
        FieldDay: false,
        PublicService: false,
        MembershipCommittee: false,
        Publicity: false,
        Fundraising: false,
        MeetingPrograms: false,
        ClubOfficer: false,
        HamLetter: false,
        Website: false,
        csuTrailer: false,
        Repeaters: false,
        Net: false,
        Training: false,
        YouthPrograms: false,
        VEtesting: false,
        other: ''
    },
    amount: 0
}

const UPDATE_MEMBER_INFO = 'UPDATE_MEMBER_INFO'
const ADD_FAMILY_MEMBER = 'ADD_FAMILY_MEMBER'
const UPDATE_MEMBER_BADGE = 'UPDATE_MEMBER_BADGE'
const UPDATE_COMMITTEES = 'UPDATE_COMMITTEES'
const SET_AMOUNT = 'SET_AMOUNT'

export const updateMemberInfo = (newmemberInfo) => {
    return {
        type : UPDATE_MEMBER_INFO,
        update: newmemberInfo
    }
}

export const updateMemberBadge = (newmemberInfo) => {
    return {
        type : UPDATE_MEMBER_BADGE,
        update: newmemberInfo
    }
}

export const updateMemberCommittees = (newmemberInfo) => {
    return {
        type : UPDATE_COMMITTEES,
        update: newmemberInfo
    }
}

export const addFamilyMember = (FamilyMember) => {
    return {
        type: ADD_FAMILY_MEMBER,
        family: FamilyMember
    }
}

export const setAmount = (membershipType) =>{
    let amount = 13
    if(membershipType === 'Family') amount = 39;
    if(membershipType === 'Full') amount = 26;
    if(membershipType === 'Lifetime') amount = 0
    return {
        type: SET_AMOUNT,
        amount
    }
}

export const submitMember = (memberInfo, history) => {
    return async (dispatch) =>{
        try  { 
            const response = await axios.post("/api/membership/member", memberInfo.contact)
            const member = response.data
            if(memberInfo.badge.Desired)  axios.post('/api/membership/badge', {member, badge: memberInfo.badge})
            const groups = Object.keys(memberInfo.committees).filter(committee => memberInfo.committees[committee] && memberInfo.committees[committee] !== '')
            if(groups.length) axios.post('/api/membership/committees', {member, committee: memberInfo.committees})
            dispatch(updateMemberInfo(member))
            history.push('/membershipConfirmation')
        } catch (error){
            console.log(error.message)
        }
    }
}

export const submitFamilyMember = (memberInfo) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/membership/family', memberInfo.contact)
            const FamilyMember = response.data
            if(memberInfo.badge.Desired) await axios.post('/api/membership/badge', {member: FamilyMember, badge: memberInfo.badge})
            const groups = Object.keys(memberInfo.committees).filter(committee => memberInfo.committees[committee] && memberInfo.committees[committee] !== '')
            if(groups.length) await axios.post('/api/membership/committees', {member: FamilyMember, committee: memberInfo.committees})
            dispatch(addFamilyMember(FamilyMember))
        } catch (error){
            console.log(error.message)
        }
    }
}

export const payment = (memberInfo, history) => {
    console.log(memberInfo)
    return () => {
        axios.post('/api/membership/payment', memberInfo)
        .then(payment => history.push('/membership'))
    .catch(error => console.log(error.message))
}}






const memberReducer = (member = initialState, action) =>{
    switch (action.type){
        case UPDATE_MEMBER_INFO:
            return {...member, contact: {...member.contact, ...action.update}}
        case UPDATE_MEMBER_BADGE:
            return {...member, badge: {...member.badge, ...action.update}}
        case UPDATE_COMMITTEES: 
            return {...member, committees: {...member.committees, ...action.update}}
        case ADD_FAMILY_MEMBER:
            const familyID =  [...member.contact.FamilyMembers, action.family]
            const family = {
                FirstName: '',
                Email: '',
                Callsign: '',
                Phone: '',
                FamilyMembers: familyID
            }
            return {...member, badge: {...initialState.badge}, contact: {...member.contact, ...family}};
        case SET_AMOUNT:
            return {...member, amount: action.amount}
        default:
            return member
    }
}

export default memberReducer