import axios from 'axios';

const ALL_EVENTS = 'ALL_EVENTS';
const ADD_EVENT = 'ADD_EVENT';

export const setEvents = (calendarEvents) => {
  return {
    type: ALL_EVENTS,
    calendarEvents,
  };
};

export const addEvent = (newEvent) => {
  return {
    type: ADD_EVENT,
    newEvent,
  };
};

export const fetchAllEvents = () => {
  return async (dispatch) => {
    try {
      console.log('all events');
      const res = await axios.get('phpfiles/getAllCalendarEvents.php');
      const calendarEvents = res.data;
      console.log(calendarEvents);
      dispatch(setEvents(calendarEvents));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchMonthsEvents = () => {
  return async (dispatch) => {
    try {
      console.log('this month ');
      const res = await fetch('phpfiles/getThisMonthsCalanderEvents.php');
      const calendarEvents = res.data;
      console.log('this month data:', calendarEvents);
      dispatch(setEvents(calendarEvents));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchTrainingEvents = () => {
  return async (dispatch) => {
    try {
      console.log('training');
      const res = await axios.get('phpfiles/getTrainingCalendarEvents.php');
      console.log(res);
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
