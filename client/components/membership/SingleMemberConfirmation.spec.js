import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import * as rrd from 'react-router-dom';
import store from '../../store';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import SingleMemberConfirmation from './SingleMemberConfirmation';
import { updateMemberInfo } from '../../redux/membership';

describe.skip('Single Member signup confirmation page', () => {
  let confirmationPage;
  let mockAxios;
  let memberInfo = {
    FirstName: 'Hannah',
    LastName: 'Green',
    Callsign: 'Ka9ddd',
    Phone: '1234567890',
    Street: '123 happy lane',
    City: 'st upidtown',
    State: 'MA',
    Zip: 60606,
    Membership: 'Full',
    Email: 'abcde123@abc.com',
    DueYear: 2020,
    RenewalDate: new Date(),
  };
  let pageDivs;
  before(() => {
    mockAxios = new mockAdapter(axios);
    confirmationPage = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/memberConfirmation']}>
          <SingleMemberConfirmation />
        </rrd.MemoryRouter>
      </Provider>
    );
    store.dispatch(updateMemberInfo(memberInfo));
    pageDivs = confirmationPage.find('div').map((node) => node.get(0).props);

    console.log(pageDivs);
  });
  it('has a sub title', () => {
    expect(pageDivs[0].classname).to.be.equal('Subtitle');
  });
});
