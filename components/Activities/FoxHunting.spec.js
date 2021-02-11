import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import FoxHunting from './FoxHunting';

//Tests: 24 passing 0 pending/failing
describe.skip('FoxHunting Component', () => {
  let foxhuntingPage;
  before(() => {
    foxhuntingPage = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/Events']}>
          <FoxHunting />
        </rrd.MemoryRouter>
      </Provider>
    );
  });
  describe('schedule table', () => {
    let rows;
    before(() => {
      rows = foxhuntingPage.find('tr').map((node) => node.get(0));
    });
    it('has 5 rows', () => {
      expect(rows).to.have.lengthOf(5);
    });
    describe('header', () => {
      let headers;
      before(() => {
        headers = rows[0].props.children.map((th) => th.props.children);
      });
      it('has 3 columns', () => {
        expect(headers).to.have.lengthOf(3);
      });
      it('has a Saturday Column', () => {
        expect(headers[0]).to.be.equal('Saturday');
      });
      it('has a Start Location Column', () => {
        expect(headers[1]).to.be.equal('Start Location');
      });
      it('has a frequency column', () => {
        expect(headers[2]).to.be.equal('Frequency');
      });
    });
    describe('1st weekend', () => {
      let weekend;
      before(() => {
        weekend = rows[1].props.children.map((td) => td.props.children);
      });
      it('has 3 columns', () => {
        expect(weekend).to.have.lengthOf(3);
      });
      it('Saturday Column = 1st', () => {
        expect(weekend[0]).to.be.equal('1st');
      });
      it('Start Location = Kmart in elmhurst', () => {
        expect(weekend[1]).to.be.equal(
          'KMart Parking lot, Elmhurst, Rt 83 north of St Charles Rd'
        );
      });
      it('frequency column = 147.75', () => {
        expect(weekend[2]).to.be.equal('CFAR 147.750 MHz');
      });
    });
    describe('2nd weekend', () => {
      let weekend;
      before(() => {
        weekend = rows[2].props.children.map((td) => td.props.children);
      });
      it('has 3 columns', () => {
        expect(weekend).to.have.lengthOf(3);
      });
      it('Saturday Column = 2nd', () => {
        expect(weekend[0]).to.be.equal('2nd');
      });
      it('Start Location = Downers Grove Golf Club', () => {
        expect(weekend[1]).to.be.equal(
          'Downers Grove Golf Club parking lot, Belmont Rd south of Odgen Ave'
        );
      });
      it('frequency column = 146.565', () => {
        expect(weekend[2]).to.be.equal('Simplex 146.565 MHz');
      });
    });
    describe('3rd weekend', () => {
      let weekend;
      before(() => {
        weekend = rows[3].props.children.map((td) => td.props.children);
      });
      it('has 3 columns', () => {
        expect(weekend).to.have.lengthOf(3);
      });
      it('Saturday Column = 3rd', () => {
        expect(weekend[0]).to.be.equal('3rd');
      });
      it('Start Location = Centennial park', () => {
        expect(weekend[1]).to.be.equal(
          'Centennial Park, Addison, Rohlwing Rd, 0.4 miles south of Lake St'
        );
      });
      it('frequency column = 146.160', () => {
        expect(weekend[2]).to.be.equal('CFMC 146.160 MHz');
      });
    });
    describe('4th weekend', () => {
      let weekend;
      before(() => {
        weekend = rows[4].props.children.map((td) => td.props.children);
      });
      it('has 3 columns', () => {
        expect(weekend).to.have.lengthOf(3);
      });
      it('Saturday Column = 4th', () => {
        expect(weekend[0]).to.be.equal('4th');
      });
      it('Start Location = Wooddale', () => {
        expect(weekend[1]).to.be.equal(
          'WoodDale Rd between Thorndale and Irving Pk Rd'
        );
      });
      it('frequency column = 146.34', () => {
        expect(weekend[2]).to.be.equal('Simplex 146.34 MHz');
      });
    });
  });
  describe('Header', () => {
    let header;
    before(() => {
      header = foxhuntingPage
        .find('div')
        .map((node) => node.get(0).props)
        .filter((div) => div.className === 'Announcement');
    });
    it('has only one header', () => {
      expect(header).to.have.lengthOf(1);
    });
    it('had a header with a class of Announcement', () => {
      expect(header[0].className).to.be.equal('Announcement');
    });
    it('reads Saturday Night Fox Hunting', () => {
      expect(header[0].children).to.be.equal('Saturday Night Fox Hunting');
    });
  });
});
