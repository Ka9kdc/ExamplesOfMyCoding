import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import { setEvents } from '../../reduxStore/calendar';
import { fakecalendarEvents, fakeTrainingEvent } from '../index.spec';
import TrainingEvents from './TrainingEvents';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';

//Tests 20 passing 0pending/failing
//Add axios calles and check that they are called
describe('Training - Event Section', () => {
  let mockAxios;
  const fakeEvent2 = {
    id: 4,
    Name: 'Tech',
    Start: '2021-07-17T14:00:00.000Z',
    End: '2021-07-18T22:00:00.000Z',
    Location: 'Park',
    Type: 'Training Class',
  };
  const fakeEvent3 = {
    id: 5,
    Name: 'General',
    Start: '2021-07-17T14:00:00.000Z',
    End: '2021-07-18T22:00:00.000Z',
    Location: 'librady',
    Type: 'Testing',
    Description: 'genrel',
  };
  const fakeEvent4 = {
    id: 6,
    Name: 'Tech',
    Start: '2021-07-17T14:00:00.000Z',
    End: '2021-07-18T22:00:00.000Z',
    Location: 'Park',
    Type: 'Testing',
    Description: 'General',
  };
  beforeEach(async () => {
    mockAxios = new mockAdapter(axios);
    await mockAxios.onGet('/api/calendar/training').replyOnce(200, []);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('titles', () => {
    let titles;
    before(() => {
      let section = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['/Training']}>
            <TrainingEvents />
          </rrd.MemoryRouter>
        </Provider>
      );
      titles = section.find('h2').map((node) => node.get(0).props);
    });
    it('has 2 titles', () => {
      expect(titles).to.have.lengthOf(2);
    });
    it('has 1st header = Upcoming Technician Class Training and License Examination', () => {
      expect(titles[0].children).to.be.equal(
        'Upcoming Technician Class Training and License Examination'
      );
    });
    it('has 2nd header = Additional Exam Sessions', () => {
      expect(titles[1].children).to.be.equal('Additional Exam Sessions');
    });
  });
  describe('no scheduled events', () => {
    let news;
    before(async () => {
      await store.dispatch(setEvents([]));
      let section = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['/Training']}>
            <TrainingEvents />
          </rrd.MemoryRouter>
        </Provider>
      );
      news = section.find('div').map((node) => node.get(0).props);
    });
    it('has a className of NewsItem', () => {
      expect(news[0].className).to.be.equal('NewsItem');
      expect(news[1].className).to.be.equal('NewsItem');
    });
    it('has a single child', () => {
      expect(news[0].children).to.be.an('object');
      expect(news[1].children).to.be.an('object');
    });
    it('has a single p as a child', () => {
      expect(news[0].children.type).to.be.equal('p');
      expect(news[1].children.type).to.be.equal('p');
    });
    it('says to check back later nothing currently schuduled', () => {
      expect(news[0].children.props.children).to.include(
        'no classes currently schedule'
      );
      expect(news[0].children.props.children).to.include(
        'Please check back later'
      );
      expect(news[1].children.props.children).to.include(
        'no additional WCRA Exam session scheduled '
      );
      expect(news[1].children.props.children).to.include(
        'Please check back later'
      );
    });
  });
  describe('events scheduled', () => {
    let section;
    let news;
    let new1p;
    let new2p;
    let new3p;
    let new4p;
    before(async () => {
      await store.dispatch(
        setEvents([...fakecalendarEvents, fakeEvent2, fakeEvent3, fakeEvent4])
      );
      section = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['/Training']}>
            <TrainingEvents />
          </rrd.MemoryRouter>
        </Provider>
      );
      news = section
        .find('div')
        .map((node) => node.get(0))
        .filter((node) => node.key)
        .map((node) => node.props);
      new1p = news[0].children
        .filter((child) => child.type === 'p')
        .map((child) => child.props.children);
      new2p = news[1].children
        .filter((child) => child.type === 'p')
        .map((child) => child.props.children);
      new3p = news[2].children
        .filter((child) => child.type === 'p')
        .map((child) => child.props.children);
      new4p = news[3].children
        .filter((child) => child.type === 'p')
        .map((child) => child.props.children);
    });
    it('gets an array of 6 events from the store', () => {
      let storeArray = section.get(0).props.store.getState().calendarEvents;
      expect(storeArray).to.have.lengthOf(6);
    });
    it('the store arr only has 2 classes in it', () => {
      let storeArray = section
        .get(0)
        .props.store.getState()
        .calendarEvents.filter((cal) => cal.Type === 'Training Class');
      expect(storeArray).to.have.lengthOf(2);
    });
    it('the store arr only has 2 testing in it', () => {
      let storeArray = section
        .get(0)
        .props.store.getState()
        .calendarEvents.filter((cal) => cal.Type === 'Testing');
      expect(storeArray).to.have.lengthOf(2);
    });
    it('has 4 special event divs rendered', () => {
      expect(news).to.have.lengthOf(4);
    });
    it('both have a class of NewsItem', () => {
      expect(news[0].className).to.be.equal('NewsItem');
      expect(news[1].className).to.be.equal('NewsItem');
      expect(news[2].className).to.be.equal('NewsItem');
      expect(news[3].className).to.be.equal('NewsItem');
    });
    it('all have a h3 header', () => {
      const [newH1] = news[0].children.filter((child) => child.type === 'h3');
      const [newH2] = news[1].children.filter((child) => child.type === 'h3');
      const [newH3] = news[2].children.filter((child) => child.type === 'h3');
      const [newH4] = news[3].children.filter((child) => child.type === 'h3');
      expect(newH1.props.children.join('')).to.be.equal(
        'Weather Net on November 10, 2020'
      );
      expect(newH2.props.children.join('')).to.be.equal(
        'Tech on July 17, 2021'
      );
      expect(newH3.props.children.join('')).to.be.equal(
        'General on July 17, 2021'
      );
      expect(newH4.props.children.join('')).to.be.equal(
        'Tech on July 17, 2021'
      );
    });
    it('all have 3 paragraphs', () => {
      expect(new1p).to.have.lengthOf(3);
      expect(new2p).to.have.lengthOf(3);
      expect(new3p).to.have.lengthOf(3);
      expect(new4p).to.have.lengthOf(3);
    });
    it('all give the  time range', () => {
      expect(new1p[0].join('')).to.be.equal('Time: 7:00 PM to 7:15 PM');
      expect(new2p[0].join('')).to.be.equal('Time: 9:00 AM to 5:00 PM');
      expect(new3p[0].join('')).to.be.equal('Time: 9:00 AM to 5:00 PM');
      expect(new4p[0].join('')).to.be.equal('Time: 9:00 AM to 5:00 PM');
    });
    it('both give a location in the middle p', () => {
      expect(new1p[1][1]).to.be.equal(fakeTrainingEvent.Location);
      expect(new2p[1][1]).to.be.equal(fakeEvent2.Location);
      expect(new3p[1][1]).to.be.equal(fakeEvent3.Location);
      expect(new4p[1][1]).to.be.equal(fakeEvent4.Location);
    });
    it('both give a Description if defined in the last p', () => {
      expect(new1p[2]).to.be.equal(fakeTrainingEvent.Description);
      expect(new2p[2]).to.be.equal(fakeEvent2.Description);
      expect(new3p[2]).to.be.equal(fakeEvent3.Description);
      expect(new4p[2]).to.be.equal(fakeEvent4.Description);
    });
  });
  describe('links', () => {
    let links;
    before(() => {
      let section = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['/Training']}>
            <TrainingEvents />
          </rrd.MemoryRouter>
        </Provider>
      );
      links = section.find('a').map((node) => node.get(0).props);
    });

    it('has 2 links', () => {
      expect(links).to.have.lengthOf(2);
    });
    it('has a link to Arrl seacrhing site', () => {
      expect(links[1].href).to.be.equal('http://www.arrl.org/exam_sessions/');
    });
    it('the links says  ARRL Amateur Radio License Exam search ', () => {
      expect(links[1].children).to.be.equal(
        'ARRL Amateur Radio License Exam search.'
      );
    });
  });
});
