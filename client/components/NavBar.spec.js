import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store';
import * as rrd from 'react-router-dom';

import NavBar from './NavBar';

//Tests: 13 passing 0 pending/failing
describe('NavBar component', () => {
  let navbar;
  before(() => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/']}>
          <NavBar />
        </rrd.MemoryRouter>
      </Provider>
    );
    navbar = wrapper.find('a').map((node) => node.get(0).props.children);
  });

  it('renders a Home Link', () => {
    expect(navbar).to.include('Home');
  });
  it('renders a News Link', () => {
    expect(navbar).to.include('News');
  });
  it('renders a Event and activity Link', () => {
    expect(navbar).to.include('Events/Activities');
  });
  it('renders a Repeaters Link', () => {
    expect(navbar).to.include('Repeaters');
  });
  it('renders a Hamfest Link', () => {
    expect(navbar).to.include('Hamfest');
  });
  it('renders a Newsletter Link', () => {
    expect(navbar).to.include('Newsletter');
  });
  it('renders a Training Link', () => {
    expect(navbar).to.include('Training');
  });
  it('renders a About Us Link', () => {
    expect(navbar).to.include('About Us');
  });
  it('renders a Join WCRA/membership Link', () => {
    expect(navbar).to.include('Join WCRA');
  });
  it('renders a Contact WCRA Link', () => {
    expect(navbar).to.include('Contact WCRA');
  });
  it('renders a References Link', () => {
    expect(navbar).to.include('References');
  });
  it('renders a Member Page Link', () => {
    expect(navbar).to.include('Member Page');
  });
  it('renders a Facebook Link', () => {
    expect(navbar).to.include('Facebook');
  });
});
