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
        CallSign: '',
        Phone: '',
        Street: '',
        City: 'Wheaton',
        State: 'IL',
        Zip: 60187,
        Membership: '',
        Email: '',
        RenewalDate: '',
        DueYear: '2021',
        FamilyMembers: []
    }
}

const UPDATE_MEMBER_INFO = 'UPDATE_MEMBER_INFO'
const ADD_FAMILY_MEMBER = 'ADD_FAMILY_MEMBER'

export const updateMemberInfo = (newmemberInfo) => {
    return {
        type : UPDATE_MEMBER_INFO,
        update: newmemberInfo
    }
}

export const addFamilyMember = (memberId) => {
    return {
        type: ADD_FAMILY_MEMBER,
        family: memberId
    }
}

export const submitMember = (memberInfo) => {
    return async (dispatch) =>{
        try  { 
            const response = await axios.post("/api/membership", memberInfo)
            const member = response.data
            dispatch(updateMemberInfo(member))
        } catch (error){
            console.log(error.message)
        }
    }
}

export const submitFamilyMember = (memberInfo) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/membership/family', memberInfo)
            const memberId = response.data
            dispatch(addFamilyMember(memberId))
        } catch (error){
            console.log(error.message)
        }
    }
}






const memberReducer = (member = initialState, action) =>{
    switch (action.type){
        case UPDATE_MEMBER_INFO:
            return {...member, ...action.update}
        case ADD_FAMILY_MEMBER:
            const familyID =  [...member.contact.FamilyMembers, action.family]
            const family = {
                FirstName: '',
                Email: '',
                CallSign: '',
                Phone: '',
                FamilyMembers: familyID
            }
            return {...member, contact: {...member.contact, ...family}};
        default:
            return member
    }
}

export default memberReducer