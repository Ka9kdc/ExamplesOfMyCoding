import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

import App from './app';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import Routes from './routes';

//Tests 4 passing
describe('App', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<App />);
  });
  it('renders header', () => {
    expect(wrapper.find(Header)).to.have.lengthOf(1);
  });
  it('renders NavBar', () => {
    expect(wrapper.find(NavBar)).to.have.lengthOf(1);
  });
  it('renders Routes', () => {
    expect(wrapper.find(Routes)).to.have.lengthOf(1);
  });
  it('renders Footer', () => {
    expect(wrapper.find(Footer)).to.have.lengthOf(1);
  });
});
