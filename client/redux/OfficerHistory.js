import axios from 'axios'

const initialHistory = []

const GET_OFFICER_HISTORY = "GET_OFFICER_HISTORY"

const setOfficerHistory = (officers) => {
    return {
        type: GET_OFFICER_HISTORY,
        officers
    }
}

export const getOfficerHistory = () => {
   return async dispatch => {
       try {
           const res = await axios.get('/api/officerHistory')
           const officers = res.data
           dispatch(setOfficerHistory(officers))
       } catch (error) {
           console.error(error)
       }
   } 
}

const officerHistoryReducer = (state = initialHistory, action) => {
    switch (action.type) {
        case GET_OFFICER_HISTORY:
            return action.officers;
        default:
            return state
    }
}

export default officerHistoryReducer