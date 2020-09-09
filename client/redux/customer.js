import axios from 'axios'

const initialState = {
    Name: '',
    Callsign: '',
    Company: '',
    Email: '',
    Phone: '',
    Street: '',
    City: '',
    State: 'IL',
    Zip: '',
    SpecialRequests: ''
}

const UPDATE_CUSTOMER_INFO = 'UPDATE_CUSTOMER_INFO'

export const updateCustomerInfo = (newCustomerInfo) => {
    return {
        type : UPDATE_CUSTOMER_INFO,
        update: newCustomerInfo
    }
}

export const submitVendor = (vendorInfo) => {
    return async (dispatch) =>{
        try  { 
            const response = await axios.post("/api/hamfest/vendor", vendorInfo)
            const vendor = response.data
            dispatch(updateCustomerInfo(vendor))
        } catch (error){
            console.log(error.message)
        }
    }
}

export const submitAttendee = (attendeeInfo) =>{
    return async (dispatch) => {
        try {
            const response = await axios.post("/api/hamfest/attendee", attendeeInfo)
            const attendee = response.data
            dispatch(updateCustomerInfo(attendee))
        } catch (error){
            console.log(error.message)
        }
    }
}



const customerReducer = (customer = initialState, action) =>{
    switch (action.type){
        case UPDATE_CUSTOMER_INFO:
            return {...customer, ...action.update}
        default:
            return customer
    }
}



export default customerReducer