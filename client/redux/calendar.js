import axios from 'axios';

const ALL_EVENTS = 'ALL_EVENTS';
const ADD_EVENT = 'ADD_EVENT';

const setEvents = (calendarEvents) => {
  return {
    type: ALL_EVENTS,
    calendarEvents,
  };
};

const addEvent = (newEvent) => {
  return {
    type: ADD_EVENT,
    newEvent,
  };
};

export const fetchAllEvents = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/calendar');
      const calendarEvents = res.data;
      dispatch(setEvents(calendarEvents));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchMonthsEvents = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/calendar/month');
      const calendarEvents = res.data;
      dispatch(setEvents(calendarEvents));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchTrainingEvents = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/calendar/training');
      const calendarEvents = res.data || [];
      dispatch(setEvents(calendarEvents));
    } catch (error) {
      console.error(error);
    }
  };
};

export const submitNewEvent = (newEventInfo) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('api/calendar/newEvent', newEventInfo);
      const newEvent = res.data;
      dispatch(addEvent(newEvent));
    } catch (error) {
      console.error(error);
    }
  };
};

const calendarReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_EVENTS:
      return action.calendarEvents;
    case ADD_EVENT:
      return [...state, action.newEvent];
    default:
      return state;
  }
};

export default calendarReducer;
