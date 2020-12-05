import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import PublicServiceEvents from './PublicServiceEvents';
import { setEvents } from '../../redux/calendar';
import { fakecalendarEvents, fakeServiceEvent } from '../index.spec';

//Tests 11 passing 0pending/failing
describe('Activities - Public Service Event Section', () => {
  const fakeEvent2 = {
    id: 4,
    Name: 'Field Day',
    Start: '2021-07-17T14:00:00.000Z',
    End: '2021-07-18T22:00:00.000Z',
    Location: 'Park',
    Type: 'Public Service Event',
    Description: 'contesting',
  };
  let section;
  before(() => {
    store.dispatch(setEvents([...fakecalendarEvents, fakeEvent2]));
    section = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/Event']}>
          <PublicServiceEvents />
        </rrd.MemoryRouter>
      </Provider>
    );
  });
  it('has a main div with class name = NewsItem', () => {
    let main = section.find('div').map((node) => node.get(0).props);
    expect(main[0].className).to.be.equal('NewsItem');
  });
  it('has a header of Public Service Events', () => {
    expect(section.find('h2').text()).to.be.equal('Public Service Events');
  });
  describe('maping of events', () => {
    let news;
    let new1p;
    let new2p;
    before(() => {
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
    });
    it('gets an array of 4 events from the store', () => {
      let storeArray = section.get(0).props.store.getState().calendarEvents;
      expect(storeArray).to.have.lengthOf(4);
    });
    it('the store arr only has 2 servuce events in it', () => {
      let storeArray = section
        .get(0)
        .props.store.getState()
        .calendarEvents.filter((cal) => cal.Type === 'Public Service Event');
      expect(storeArray).to.have.lengthOf(2);
    });
    it('has 2 special event divs rendered', () => {
      expect(news).to.have.lengthOf(2);
    });
    it('both have a class of NewsItem', () => {
      expect(news[0].className).to.be.equal('NewsItem');
      expect(news[1].className).to.be.equal('NewsItem');
    });
    it('both have a h3 header', () => {
      const [newH1] = news[0].children.filter((child) => child.type === 'h3');
      const [newH2] = news[1].children.filter((child) => child.type === 'h3');
      expect(newH1.props.children).to.be.equal(fakeServiceEvent.Name);
      expect(newH2.props.children).to.be.equal(fakeEvent2.Name);
    });
    it('both have 3 paragraphs', () => {
      expect(new1p).to.have.lengthOf(3);
      expect(new2p).to.have.lengthOf(3);
    });
    it('both give a date and time range', () => {
      expect(new1p[0].join('')).to.be.equal(
        'January 3, 2021 from 8:00 PM to 8:30 PM'
      );
      expect(new2p[0].join('')).to.be.equal(
        'July 17, 2021 from 9:00 AM to 5:00 PM'
      );
    });
    it('both give a location in the middle p', () => {
      expect(new1p[1][1]).to.be.equal(fakeServiceEvent.Location);
      expect(new2p[1][1]).to.be.equal(fakeEvent2.Location);
    });
    it('both give a Description if defined in the last p', () => {
      expect(new1p[2]).to.be.equal(fakeServiceEvent.Description);
      expect(new2p[2]).to.be.equal(fakeEvent2.Description);
    });
  });
});
