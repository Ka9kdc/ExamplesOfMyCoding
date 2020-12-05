import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store';
import * as rrd from 'react-router-dom';

import NavBar from './NavBar';

//Tests: 25 passing 1 pending/failing
describe('NavBar component', () => {
  let navbar;
  let navbarChildern;
  before(() => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/']}>
          <NavBar />
        </rrd.MemoryRouter>
      </Provider>
    );
    navbar = wrapper.find('a').map((node) => node.get(0).props);
    navbarChildern = navbar.map((props) => props.children);
  });
  describe('All buttons seen', () => {
    it('renders a Home Link', () => {
      expect(navbarChildern).to.include('Home');
    });
    it('renders a News Link', () => {
      expect(navbarChildern).to.include('News');
    });
    it('renders a Event and activity Link', () => {
      expect(navbarChildern).to.include('Events/Activities');
    });
    it('renders a Repeaters Link', () => {
      expect(navbarChildern).to.include('Repeaters');
    });
    it('renders a Hamfest Link', () => {
      expect(navbarChildern).to.include('Hamfest');
    });
    it('renders a Newsletter Link', () => {
      expect(navbarChildern).to.include('Newsletter');
    });
    it('renders a Training Link', () => {
      expect(navbarChildern).to.include('Training');
    });
    it('renders a About Us Link', () => {
      expect(navbarChildern).to.include('About Us');
    });
    it('renders a Join WCRA/membership Link', () => {
      expect(navbarChildern).to.include('Join WCRA');
    });
    it('renders a Contact WCRA Link', () => {
      expect(navbarChildern).to.include('Contact WCRA');
    });
    it('renders a References Link', () => {
      expect(navbarChildern).to.include('References');
    });
    it('renders a Member Page Link', () => {
      expect(navbarChildern).to.include('Member Page');
    });
    it('renders a Facebook Link', () => {
      expect(navbarChildern).to.include('Facebook');
    });
  });
  describe('routes connected', () => {
    it('renders a Home Link', () => {
      expect(navbar[0].children).to.be.equal('Home');
      expect(navbar[0].href).to.be.equal('/');
    });
    it('renders a News Link', () => {
      expect(navbar[1].children).to.be.equal('News');
      expect(navbar[1].href).to.be.equal('/News');
    });
    it('renders a Event and activity Link', () => {
      expect(navbar[2].children).to.be.equal('Events/Activities');
      expect(navbar[2].href).to.be.equal('/Events');
    });
    it('renders a Repeaters Link', () => {
      expect(navbar[3].children).to.be.equal('Repeaters');
      expect(navbar[3].href).to.be.equal('/Repeaters');
    });
    it('renders a Hamfest Link', () => {
      expect(navbar[4].children).to.be.equal('Hamfest');
      expect(navbar[4].href).to.be.equal('/Hamfest');
    });
    xit('renders a Newsletter Link', () => {
      //still a html file
      expect(navbar[5].children).to.be.equal('Newsletter');
      expect(navbar[5].href).to.be.equal('/HamLetter');
    });
    it('renders a Training Link', () => {
      expect(navbar[6].children).to.be.equal('Training');
      expect(navbar[6].href).to.be.equal('/Training');
    });
    it('renders a About Us Link', () => {
      expect(navbar[7].children).to.be.equal('About Us');
      expect(navbar[7].href).to.be.equal('/About');
    });
    it('renders a Join WCRA/membership Link', () => {
      expect(navbar[8].children).to.be.equal('Join WCRA');
      expect(navbar[8].href).to.be.equal('/Membership');
    });
    it('renders a Contact WCRA Link', () => {
      expect(navbar[9].children).to.be.equal('Contact WCRA');
      expect(navbar[9].href).to.be.equal('/ContactUs');
    });
    it('renders a References Link', () => {
      expect(navbar[10].children).to.be.equal('References');
      expect(navbar[10].href).to.be.equal('/References');
    });
    it('renders a Member Page Link', () => {
      expect(navbar[11].children).to.be.equal('Member Page');
      expect(navbar[11].href).to.be.equal('/MemberPage');
    });
    it('renders a Facebook Link', () => {
      expect(navbar[13].children).to.be.equal('Facebook');
      expect(navbar[13].href).to.be.equal(
        'https://www.facebook.com/groups/267873833946/'
      );
    });
  });
});
