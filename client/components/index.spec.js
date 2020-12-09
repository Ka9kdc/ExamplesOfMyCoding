// import {expect} from 'chai'
// import sinon from 'sinon'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)
// const initialState = {}

// import {createStore} from 'redux'
// import store from '../store'
// import appReducer from './index'

const { JSDOM } = require('jsdom');

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import store from '../store';
// import chai from 'chai';

require('mocha-suppress-logs')();

Enzyme.configure({ adapter: new Adapter() });

export const fakeSpecialEvent = {
  id: 1,
  Name: 'Hamfest',
  Start: '2021-01-17T14:00:00.000Z',
  End: '2021-01-17T22:00:00.000Z',
  Location: 'Zoom',
  Type: 'Special Event',
};
export const fakeServiceEvent = {
  id: 2,
  Name: 'Weekly Club Net',
  Start: '2021-01-04T02:00:00.000Z',
  End: '2021-01-04T02:30:00.000Z',
  Location: '145.310',
  Type: 'Public Service Event',
};
export const fakeTrainingEvent = {
  id: 3,
  Name: 'Weather Net',
  Start: '2020-11-11T01:00:00.000Z',
  End: '2020-11-11T01:15:00.000Z',
  Location: '444.475',
  Type: 'Training Class',
};
export const fakecalendarEvents = [
  fakeSpecialEvent,
  fakeTrainingEvent,
  fakeServiceEvent,
];

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
