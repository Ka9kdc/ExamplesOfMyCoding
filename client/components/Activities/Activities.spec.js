import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import Activities from './Activities';
import FoxHunting from './FoxHunting';
import Agenda from '../home/Agenda';
import SpecialEvents from './SpecialEvents';
import PublicServiceEvents from './PublicServiceEvents';
import { setEvents } from '../../redux/calendar';


//Tests: 33 passing 0 pending/failing
describe('Activites/Events page', () => {
  describe('shallow render', () => {
    let activitesPage;
    let sections;
    before(() => {
      activitesPage = shallow(<Activities />);
      sections = activitesPage.find('div').map((node) => node.get(0).props);
    });
    it('renders a title of WCRA Radio Repeaters', () => {
      let [title] = sections.filter((prop) => prop.className === 'Title');
      expect(title.children).to.be.equal('WCRA Events');
    });
    it('Agenda is rendered', () => {
      expect(activitesPage.find(Agenda)).to.have.length(1);
    });
    it('foxhunting is rendered', () => {
      expect(activitesPage.find(FoxHunting)).to.have.length(1);
    });
    it('specialEvents component is rendered', () => {
      expect(activitesPage.find(SpecialEvents)).to.have.length(1);
    });
    it('PublicServiceEvents is rendered', () => {
      expect(activitesPage.find(PublicServiceEvents)).to.have.length(1);
    });
    describe('headers', () => {
      let headers;
      before(() => {
        headers = activitesPage.find('h1').map((node) => node.get(0).props);
      });
      it('has 2 h1 headers', () => {
        expect(headers).to.have.lengthOf(2);
      });
      it('first header is Regular events', () => {
        expect(headers[0].children).to.be.equal('Regular Events');
      });
      it('second header is  for special/service events', () => {
        expect(headers[1].children).to.be.equal(
          'Special & Public Service Events'
        );
      });
      it('has an h2 header', () => {
        expect(activitesPage.find('h2')).lengthOf(1);
      });
      it('h2 header is for Meetings', () => {
        expect(activitesPage.find('h2').text()).to.be.equal('Meetings');
      });
    });
    describe('links', () => {
      let link;
      before(() => {
        link = activitesPage.find('Link').map((node) => node.get(0).props);
      });
      it('has 1 link', () => {
        expect(link).to.have.lengthOf(1);
      });
      it('has a link to Hamletter', () => {
        expect(link[0].children).to.be.equal('hamletter page');
      });
      it('links to /Hamletter', () => {
        console.log(link);
        expect(link[0].to).to.be.equal('/Hamletter');
      });
    });
  });
  describe('full mount /deep render', () => {
    const fakeSpecialEvent = {
      id: 1,
      Name: 'Hamfest',
      Start: '2021-01-17T14:00:00.000Z',
      End: '2021-01-17T22:00:00.000Z',
      Location: 'Zoom',
      Type: 'Special Event',
    };
    const fakeServiceEvent = {
      id: 2,
      Name: 'Weekly Club Net',
      Start: '2021-01-04T02:00:00.000Z',
      End: '2021-01-04T02:30:00.000Z',
      Location: '145.310',
      Type: 'Public Service Event',
    };
    const fakeTrainingEvent = {
      id: 3,
      Name: 'Weather Net',
      Start: '2020-11-11T01:00:00.000Z',
      End: '2020-11-11T01:15:00.000Z',
      Location: '444.475',
      Type: 'Training',
    };
    const fakecalendarEvents = [
      fakeSpecialEvent,
      fakeTrainingEvent,
      fakeServiceEvent,
    ];
    let activitesPage;
    let sections;
    before(async () => {
      await store.dispatch(setEvents(fakecalendarEvents));
      activitesPage = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['/Events']}>
            <Activities />
          </rrd.MemoryRouter>
        </Provider>
      );
      sections = activitesPage.find('div').map((node) => node.get(0).props);
    });
    it('renders a title of WCRA Radio Repeaters', () => {
      let [title] = sections.filter((prop) => prop.className === 'Title');
      expect(title.children).to.be.equal('WCRA Events');
    });
    it('Agenda is rendered', () => {
      expect(activitesPage.find(Agenda)).to.have.length(1);
    });
    it('Agenda title renders', () => {
      expect(activitesPage.find('h4').text()).to.be.equal('Event Calendar');
    });
    it('foxhunting is rendered', () => {
      expect(activitesPage.find(FoxHunting)).to.have.length(1);
    });
    it('foxhunting announcement title renders', () => {
      let [title] = sections.filter((div) => div.className === 'Announcement');
      expect(title.children).to.be.equal('Saturday Night Fox Hunting');
    });
    it('specialEvents component is rendered', () => {
      expect(activitesPage.find(SpecialEvents)).to.have.length(1);
    });
    it('PublicServiceEvents is rendered', () => {
      expect(activitesPage.find(PublicServiceEvents)).to.have.length(1);
    });

    describe('h1 headers', () => {
      let headers;
      before(() => {
        headers = activitesPage.find('h1').map((node) => node.get(0).props);
      });
      it('has 2 h1 headers', () => {
        expect(headers).to.have.lengthOf(2);
      });
      it('first header is Regular events', () => {
        expect(headers[0].children).to.be.equal('Regular Events');
      });
      it('second header is  for special/service events', () => {
        expect(headers[1].children).to.be.equal(
          'Special & Public Service Events'
        );
      });
    });
    describe('h2 headers', () => {
      let headers;
      before(() => {
        headers = activitesPage.find('h2').map((node) => node.get(0).props);
      });
      it('has an h2 header', () => {
        expect(headers).lengthOf(3);
      });
      it('1st h2 header is for Meetings', () => {
        expect(headers[0].children).to.be.equal('Meetings');
      });
      it('2nd is for special events', () => {
        expect(headers[1].children).to.be.equal('Special Events');
      });
      it('3rd is for public service', () => {
        expect(headers[2].children).to.be.equal('Public Service Events');
      });
    });
    describe('h3 headers', () => {
      let headers;
      before(() => {
        headers = activitesPage.find('h3').map((node) => node.get(0).props);
      });
      it('has an h3 header', () => {
        expect(headers).lengthOf(2);
      });
      it('1st h3 header is for the special event', () => {
        expect(headers[0].children).to.be.equal(fakeSpecialEvent.Name);
      });
      it('2nd is for service event', () => {
        expect(headers[1].children).to.be.equal(fakeServiceEvent.Name);
      });
    });

    describe('links', () => {
      let link;
      before(() => {
        link = activitesPage.find('Link').map((node) => node.get(0).props);
      });
      it('has 1 link', () => {
        expect(link).to.have.lengthOf(1);
      });
      it('has a link to Hamletter', () => {
        expect(link[0].children).to.be.equal('hamletter page');
      });
      it('links to /Hamletter', () => {
        console.log(link);
        expect(link[0].to).to.be.equal('/Hamletter');
      });
    });
  });
});
