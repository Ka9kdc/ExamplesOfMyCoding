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


const {JSDOM} = require('jsdom')

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../store'
import chai from 'chai'

require('mocha-suppress-logs')()

Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};