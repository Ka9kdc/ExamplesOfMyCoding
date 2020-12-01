import { expect } from 'chai';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createStore } from 'redux';
import appReducer from '../index';
import {
  addEvent,
  fetchAllEvents,
  fetchMonthsEvents,
  fetchTrainingEvents,
  setEvents,
  submitNewEvent,
} from '../calendar';

const middleware = [thunkMiddleware];
const mockStore = configureMockStore(middleware);

//Tests: 9 passing 0 pending/failing
describe('Calendar - Redux', () => {
  let store;
  let mockAxios;
  const initailState = { calendarEvents: [] };
  const fakeSpecialEvent = {
    Name: 'Hamfest',
    Start: '2021-01-17T14:00:00.000Z',
    End: '2021-01-17T22:00:00.000Z',
    Location: 'Zoom',
    Type: 'Special Event',
  };
  const fakeNewEvent = {
    Name: 'Weekly Club Net',
    Start: '2021-01-04T02:00:00.000Z',
    End: '2021-01-04T02:30:00.000Z',
    Location: '145.310',
    Type: 'Net',
  };
  const fakeTrainingEvent = {
    Name: 'Weather Net',
    Start: '2020-11-11T01:00:00.000Z',
    End: '2020-11-11T01:15:00.000Z',
    Location: '444.475',
    Type: 'Training',
  };
  const fakecalendarEvents = [fakeSpecialEvent, fakeTrainingEvent];
  beforeEach(() => {
    mockAxios = new mockAdapter(axios);
    store = mockStore(initailState);
  });
  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });
  describe('Action Creators', () => {
    it('setEvent - ALL EVENTS', () => {
      expect(setEvents(fakecalendarEvents)).to.deep.equal({
        type: 'ALL_EVENTS',
        calendarEvents: fakecalendarEvents,
      });
    });
    it('addEvent - ADD_EVENT', () => {
      expect(addEvent(fakeNewEvent)).to.deep.equal({
        type: 'ADD_EVENT',
        newEvent: fakeNewEvent,
      });
    });
  });
  describe('Thunks', () => {
    it('fetchs all events - Eventually dispatches ALL_EVENTS', async () => {
      mockAxios.onGet('/api/calendar').replyOnce(200, fakecalendarEvents);
      await store.dispatch(fetchAllEvents());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ALL_EVENTS');
      expect(actions[0].calendarEvents).to.be.deep.equal(fakecalendarEvents);
      expect(actions[0].calendarEvents[0]).to.be.deep.equal(fakeSpecialEvent);
    });
    it('fetchs months events - Eventually dispatches ALL_EVENTS', async () => {
      mockAxios.onGet('/api/calendar/month').replyOnce(200, fakecalendarEvents);
      await store.dispatch(fetchMonthsEvents());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ALL_EVENTS');
      expect(actions[0].calendarEvents).to.be.deep.equal(fakecalendarEvents);
      expect(actions[0].calendarEvents[0]).to.be.deep.equal(fakeSpecialEvent);
    });
    it('fetchs training events - Eventually dispatches ALL_EVENTS', async () => {
      mockAxios
        .onGet('/api/calendar/training')
        .replyOnce(200, [fakeTrainingEvent]);
      await store.dispatch(fetchTrainingEvents());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ALL_EVENTS');
      expect(actions[0].calendarEvents).to.be.deep.equal([fakeTrainingEvent]);
      expect(actions[0].calendarEvents[0]).to.be.deep.equal(fakeTrainingEvent);
    });
    it('submit a new event events - Eventually dispatches ADD_EVENT', async () => {
      mockAxios.onPost('/api/calendar/newEvent').replyOnce(200, fakeNewEvent);
      await store.dispatch(submitNewEvent(fakeNewEvent));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ADD_EVENT');
      expect(actions[0].newEvent).to.be.deep.equal(fakeNewEvent);
    });
  });
  describe('calendar reducer', () => {
    let testStore;
    beforeEach(() => {
      testStore = createStore(appReducer);
    });
    it('reduces on ALL_EVENTS', () => {
      const action = { type: 'ALL_EVENTS', calendarEvents: fakecalendarEvents };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState.calendarEvents).to.be.deep.equal(fakecalendarEvents);
      expect(newState.calendarEvents[0]).to.be.deep.equal(
        fakecalendarEvents[0]
      );
      expect(newState).to.not.be.equal(prevState);
    });
    it('reduces on ADD_EVENT', () => {
      const action = { type: 'ADD_EVENT', newEvent: fakeNewEvent };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState.calendarEvents).to.be.deep.equal([fakeNewEvent]);
      expect(newState.calendarEvents[0]).to.be.deep.equal(fakeNewEvent);
      expect(newState).to.not.be.equal(prevState);
    });
    it('returns the initial state on default', () => {
      const action = { type: 'SET_PROFILE', newEvent: fakeNewEvent };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState.calendarEvents).to.not.be.equal(fakeNewEvent);
    });
  });
});
