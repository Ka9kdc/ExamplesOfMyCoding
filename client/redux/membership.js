import axios from 'axios'




const initialState = {
    badge: {
        Desired: false,
        badgeType: '',
        ArrlLogo: false,
        Color: '',
        badgeName: '',
        LicenseYear: 0,
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
    Committees: {
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
    }
}

const UPDATE_MEMBER_INFO = 'UPDATE_MEMBER_INFO'
const ADD_FAMILY_MEMBER = 'ADD_FAMILY_MEMBER'
const UPDATE_MEMBER_BADGE = 'UPDATE_MEMBER_BADGE'
const UPDATE_COMMITTEES = 'UPDATE_COMMITTEES'

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

export const submitMember = (memberInfo) => {
    return async (dispatch) =>{
        try  { 
            const response = await axios.post("/api/membership/member", memberInfo.contact)
            const member = response.data
            if(memberInfo.badge.Desired) await axios.post('/api/membership/badge', {member, badge: memberInfo.badge})
            const groups = Object.keys(memberInfo.Committees).filter(committee => memberInfo.Committees[committee] && memberInfo.Committees[committee] !== '')
            if(groups.length) await axios.post('/api/membership/committees', {member, committee: memberInfo.Committees})
            dispatch(updateMemberInfo(member))
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
            const groups = Object.keys(memberInfo.Committees).filter(committee => memberInfo.Committees[committee] && memberInfo.Committees[committee] !== '')
            if(groups.length) await axios.post('/api/membership/committees', {member: FamilyMember, committee: memberInfo.Committees})
            dispatch(addFamilyMember(FamilyMember))
        } catch (error){
            console.log(error.message)
        }
    }
}






const memberReducer = (member = initialState, action) =>{
    switch (action.type){
        case UPDATE_MEMBER_INFO:
            return {...member, contact: {...member.contact, ...action.update}}
        case UPDATE_MEMBER_BADGE:
            return {...member, badge: {...member.badge, ...action.update}}
        case UPDATE_COMMITTEES: 
            return {...member, Committees: {...member.Committees, ...action.update}}
        case ADD_FAMILY_MEMBER:
            const familyID =  [...member.contact.FamilyMembers, action.family]
            const family = {
                FirstName: '',
                Email: '',
                Callsign: '',
                Phone: '',
                FamilyMembers: familyID
            }
            return {...initialState, contact: {...member.contact, ...family}};
        default:
            return member
    }
}

export default memberReducer