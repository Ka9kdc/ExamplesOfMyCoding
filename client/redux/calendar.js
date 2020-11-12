import axios from 'axios'


const ALL_EVENTS = 'AL_EVENTS'

const setEvents = (calendarEvents) => {
    return {
        type: ALL_EVENTS,
        calendarEvents
    }
}

export const fetchAllEvents = () => {
    return async dispatch => {
        try {
            const res = await axios.get('/api/calendar')
            const calendarEvents = res.data
            dispatch(setEvents(calendarEvents))
        } catch (error) {
            console.error(error);
        }
    }
}

export const fetchMonthsEvents = () => {
    return async dispatch => {
        try {
            const res = await axios.get('/api/calendar/month')
            const calendarEvents = res.data
            dispatch(setEvents(calendarEvents))
        } catch (error) {
            console.error(error);
        }
    }
}

const calendarReducer = (state = [], action) => {
    switch (action.type) {
        case ALL_EVENTS:
            return action.calendarEvents;
        default:
            return state
    }
}


export default calendarReducer