import axios from 'axios'


const initialState = {
    badge: {
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
    }
}

const UPDATE_MEMBER_INFO = 'UPDATE_MEMBER_INFO'

export const updateMemberInfo = (newmemberInfo) => {
    return {
        type : UPDATE_MEMBER_INFO,
        update: newmemberInfo
    }
}

export const submitMember = (memberInfo) => {
    return async (dispatch) =>{
        try  { 
            const response = await axios.post("/api/membership", memberInfo)
            const member = response.data
            dispatch(updatememberInfo(member))
        } catch (error){
            console.log(error.message)
        }
    }
}



const memberReducer = (member = initialState, action) =>{
    switch (action.type){
        case UPDATE_MEMBER_INFO:
            return {...member, ...action.update}
        default:
            return member
    }
}

export default memberReducer