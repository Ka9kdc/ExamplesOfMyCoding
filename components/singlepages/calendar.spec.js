import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import * as rrd from 'react-router-dom';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import store from '../../store';
import MyCalender from './calendar';
import { Calendar } from 'react-big-calendar';
import { fakecalendarEvents } from '../index.spec';
import NewEvent from './NewEvent';

//Tests: 6 passing 1pending/failing
describe('Calender', () => {
  let calendarPage;
  let mockAxios;
  const mockUser = {
    Callsign: 'ka9ddd',
    id: 1,
    password: '12345',
  };
  describe('loading page', () => {
    before(() => {
      mockAxios = new mockAdapter(axios);
      mockAxios.onGet('/api/calendar').replyOnce(200, fakecalendarEvents);
      mockAxios.onGet('/api/user/me').replyOnce(200, mockUser);
      calendarPage = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['/Calendar']}>
            <MyCalender />
          </rrd.MemoryRouter>
        </Provider>
      );
    });
    it('has a header of calender', () => {
      let header = calendarPage.find('div').map((node) => node.get(0).props)[0];
      expect(header.className).to.equal('Title');
      expect(header.children).to.equal('Calendar');
    });
    xit('has a loading message if not events are loaded', () => {
      expect(calendarPage.find('h1').text()).to.equal('Loading');
    });
  });
  describe('calendar', () => {
    before(async () => {
      mockAxios = new mockAdapter(axios);
      await mockAxios.onGet('/api/calendar').replyOnce(200, fakecalendarEvents);
      await mockAxios.onGet('/api/user/me').replyOnce(200, mockUser);
      calendarPage = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['/Calendar']}>
            <MyCalender myEventsList={[fakecalendarEvents]} />
          </rrd.MemoryRouter>
        </Provider>
      );
    });
    it('renders a calendar', () => {
      expect(calendarPage.find(Calendar)).to.have.lengthOf(1);
    });
    it('has a header of calender', () => {
      let header = calendarPage.find('div').map((node) => node.get(0).props)[0];
      expect(header.className).to.equal('Title');
      expect(header.children).to.equal('Calendar');
    });
  });
  describe('calendar', () => {
    before(async () => {
      mockUser.id = 1;
      mockAxios = new mockAdapter(axios);
      await mockAxios.onGet('/api/calendar').replyOnce(200, fakecalendarEvents);
      await mockAxios.onGet('/api/user/me').replyOnce(200, mockUser);
      calendarPage = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['/Calendar']}>
            <MyCalender myEventsList={[fakecalendarEvents]} />
          </rrd.MemoryRouter>
        </Provider>
      );
    });
    it('renders the new Event', () => {
      expect(calendarPage.find(NewEvent)).to.have.lengthOf(1);
    });
    it('renders a calendar', () => {
      expect(calendarPage.find(Calendar)).to.have.lengthOf(1);
    });
    it('has a header of calender', () => {
      let header = calendarPage.find('div').map((node) => node.get(0).props)[0];
      expect(header.className).to.equal('Title');
      expect(header.children).to.equal('Calendar');
    });
  });
});
