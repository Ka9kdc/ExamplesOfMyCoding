import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import Training from './Training';
import TrainingEvents from './TrainingEvents';
import mockAdapter from 'axios-mock-adapter';
import axios from 'axios';

//Tests 11 passing 0pending/failing
describe('Training Page', () => {
  describe('shallow Render', () => {
    let trainingPage;
    before(() => {
      trainingPage = shallow(<Training />);
    });
    it('renders a title of WCRA Radio Repeaters', () => {
      let [title] = trainingPage
        .find('div')
        .map((node) => node.get(0).props)
        .filter((prop) => prop.className === 'Title');
      expect(title.children).to.be.equal('Amateur Radio Classes & Testing');
    });
    it('has 3 links', () => {
      expect(trainingPage.find('a')).to.have.lengthOf(3);
    });
    it('TrainingEvents is rendered', () => {
      expect(trainingPage.find(TrainingEvents)).to.have.length(1);
    });
    it('has an h2 for Additional Resources', () => {
      expect(trainingPage.find('h2').text()).to.be.equal(
        'Additional Resources'
      );
    });
  });
  describe('full mount', () => {
    let trainingPage;
    let mockAxios
    before(async() => {
      mockAxios = new mockAdapter(axios)
      await mockAxios.onGet('/api/calendar/training').replyOnce(200, []);
      trainingPage = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['/training']}>
            <Training />
          </rrd.MemoryRouter>
        </Provider>
      );
    });
    after(() => {
      mockAxios.restore();
    });
    it('renders a title of WCRA Radio Repeaters', () => {
      let [title] = trainingPage
        .find('div')
        .map((node) => node.get(0).props)
        .filter((prop) => prop.className === 'Title');
      expect(title.children).to.be.equal('Amateur Radio Classes & Testing');
    });
    it('has 5 links', () => {
      expect(trainingPage.find('a')).to.have.lengthOf(5);
    });
    it('TrainingEvents is rendered', () => {
      expect(trainingPage.find(TrainingEvents)).to.have.length(1);
    });
    describe('h2 headers', () => {
      let headers;
      before(() => {
        headers = trainingPage.find('h2').map((node) => node.get(0).props);
      });
      it('has an h2 header', () => {
        expect(headers).lengthOf(3);
      });
      it('1st h2 header is for Upcoming Technician Class Training and License Examination', () => {
        expect(headers[0].children).to.be.equal(
          'Upcoming Technician Class Training and License Examination'
        );
      });
      it('2nd is for service event', () => {
        expect(headers[1].children).to.be.equal('Additional Exam Sessions');
      });
      it('has an h2 for Additional Resources', () => {
        expect(headers[2].children).to.be.equal('Additional Resources');
      });
    });
  });
});
