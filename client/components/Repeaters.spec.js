import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store';
import * as rrd from 'react-router-dom';
import Repeaters from './singlepages/Repeaters';

//Tests: 46 passing 0 pending/failing
describe('Repeater component/page', () => {
  let repeaterPage;
  let repeaters;
  let nets;
  before(() => {
    repeaterPage = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/repeater']}>
          <Repeaters />
        </rrd.MemoryRouter>
      </Provider>
    );
    let tables = repeaterPage.find('table').map((node) => node.get(0).props);
    repeaters = tables
      .filter((props) => props.className === undefined)
      .map((props) => props.children);
    nets = tables
      .filter((props) => props.className === 'Nets')
      .map((props) => props.children);
  });
  it('renders a title of WCRA Radio Repeaters', () => {
    let [title] = repeaterPage
      .find('div')
      .map((node) => node.get(0).props)
      .filter((prop) => prop.className === 'Title');
    expect(title.children).to.be.equal('WCRA Radio Repeaters');
  });
  describe('Repeater Frequency table', () => {
    let rows;
    before(() => {
      rows = repeaters[0].props.children;
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
      it('has a frequency column', () => {
        expect(headers[0]).to.be.equal('Frequency (MHz)');
      });
      it('has a PL Tone Column', () => {
        expect(headers[1]).to.be.equal('PL Tone (Hz)');
      });
      it('has a Mode Column', () => {
        expect(headers[2]).to.be.equal('Mode');
      });
    });
    describe('31 repeater', () => {
      let repeater;
      before(() => {
        repeater = rows[1].props.children.map((td) => td.props.children);
      });
      it('has 3 columns', () => {
        expect(repeater).to.have.lengthOf(3);
      });
      it('frequency is 145.31/144.71', () => {
        expect(repeater[0]).to.be.equal('145.310/144.710');
      });
      it('PL tone of 107.2', () => {
        expect(repeater[1]).to.be.equal('107.2 (1B) PL Encode/Decode');
      });
      it('mode', () => {
        expect(repeater[2]).to.be.equal('Auto In/Auto Out');
      });
    });
    describe('39 repeater', () => {
      let repeater;
      before(() => {
        repeater = rows[2].props.children.map((td) => td.props.children);
      });
      it('has 4 columns', () => {
        expect(repeater).to.have.lengthOf(4);
      });
      it('frequency is 145.39/144.79', () => {
        expect(repeater[0]).to.be.equal('145.390/144.790');
      });
      it('PL tone of 107.2', () => {
        expect(repeater[1]).to.be.equal('107.2 (1B) PL Encode/Decode');
      });
      it('mode', () => {
        expect(repeater[2]).to.be.equal('Auto In/Auto Out');
      });
    });
    describe('220 repeater', () => {
      let repeater;
      before(() => {
        repeater = rows[3].props.children.map((td) => td.props.children);
      });
      it('has 3 columns', () => {
        expect(repeater).to.have.lengthOf(3);
      });
      it('frequency is 224.140/222.540', () => {
        expect(repeater[0]).to.be.equal('224.140/222.540');
      });
      it('PL tone of 110.9', () => {
        expect(repeater[1]).to.be.equal('110.9 (2Z) PL Encode/Decode');
      });
      it('mode', () => {
        expect(repeater[2]).to.be.equal('NON Digital');
      });
    });
    describe('440 repeater', () => {
      let repeater;
      before(() => {
        repeater = rows[4].props.children.map((td) => td.props.children);
      });
      it('has 3 columns', () => {
        expect(repeater).to.have.lengthOf(3);
      });
      it('frequency is 444.475/449.475', () => {
        expect(repeater[0]).to.be.equal('444.475/449.475');
      });
      it('PL tone of 114.8.2', () => {
        expect(repeater[1]).to.be.equal('114.8 (2A) PL Encode/Decode');
      });
      it('mode', () => {
        expect(repeater[2]).to.be.equal('Auto In/Auto Out');
      });
    });
  });
  describe('Nets', () => {
    let rows;
    before(() => {
      rows = nets[0].props.children;
    });
    it('has a  h1 header of On-Air Nets', () => {
      expect(repeaterPage.find('h1').text()).to.be.equal('On-Air Nets');
    });
    it('has a h2 header of Net Schedule', () => {
      expect(repeaterPage.find('h2').text()).to.be.equal('Net Schedule');
    });
    it('has 5 rows', () => {
      expect(rows).to.have.lengthOf(5);
    });
    // it('last row is empty', () => {
    //   expect(rows[4].props).to.be.empty;
    // });
    describe('header', () => {
      let headers;
      before(() => {
        headers = rows[0].props.children.map((th) => th.props.children);
      });
      it('has 4 columns', () => {
        expect(headers).to.have.lengthOf(4);
      });
      it('has a Day Column', () => {
        expect(headers[0]).to.be.equal('Day');
      });
      it('has a Time Column', () => {
        expect(headers[1]).to.be.equal('Time');
      });
      it('has a frequency column', () => {
        expect(headers[2]).to.be.equal('Frequency');
      });
      it('has a net control column', () => {
        expect(headers[3]).to.be.equal('Net Control');
      });
    });
    describe('WCRA Weekly net', () => {
      let net;
      before(() => {
        net = rows[1].props.children.map((th) => th.props.children);
      });
      it('has 4 columns', () => {
        expect(net).to.have.lengthOf(4);
      });
      it('Day = Suday', () => {
        expect(net[0]).to.be.equal('Sunday');
      });
      it('Time Column = 8pm', () => {
        expect(net[1]).to.be.equal('8:00pm');
      });
      it('frequency column = 31', () => {
        expect(net[2]).to.be.equal('145.310');
      });
      it('net control column = rotates', () => {
        expect(net[3]).to.be.equal('Rotates');
      });
    });
    describe('Weather Net', () => {
      let net;
      before(() => {
        net = rows[2].props.children.map((th) => th.props.children);
      });
      it('has 4 columns', () => {
        expect(net).to.have.lengthOf(4);
      });
      it('Day = 2nd and 4th tuesday', () => {
        expect(net[0]).to.be.equal('Tuesday (2nd & 4th)');
      });
      it('Time Column = 7pm', () => {
        expect(net[1]).to.be.equal('7:00pm');
      });
      it('frequency column = 44 machine', () => {
        expect(net[2]).to.be.equal('444.475');
      });
      it('net control column = Weather', () => {
        expect(net[3]).to.be.equal('Weather Net');
      });
    });
    describe('WCRA 5th sunday net', () => {
      let net;
      before(() => {
        net = rows[3].props.children.map((th) => th.props.children);
      });
      it('has 4 columns', () => {
        expect(net).to.have.lengthOf(4);
      });
      it('Day = 5th sunday', () => {
        expect(net[0]).to.be.equal('Sunday (5th)');
      });
      it('Time Column = 8pm', () => {
        expect(net[1]).to.be.equal('8:00pm');
      });
      it('frequency column = 44 machine', () => {
        expect(net[2]).to.be.equal('444.475');
      });
      //   it('net control column = undefined', () => {
      //     expect(net[3]).to.be.undefined;
      //   });
    });
  });
});
