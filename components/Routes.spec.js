import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import * as rrd from 'react-router-dom';
import store from '../store';

import Routes from './Routes';
import Home from './home/Home';
import MemberPage from './MemberPage/MemberPage';
import signup from './MemberPage/signup';
import Membership from './membership/Membership';
import MemberConfirmation from './membership/MemberConfirmation';
import MembershipForm from './membership/membershipForm';
import TextApplication from './membership/TextApplication';
import References from './References';
import AboutUs from './AboutUs/AboutUs';
import Bylaws from './AboutUs/Bylaws';
import ContactUs from './AboutUs/ContactUs';
import Repeaters from './singlepages/Repeaters';
import OfficerHistory from './AboutUs/OfficerHistory';
import News from './singlepages/News';
import MyCalender from './singlepages/calendar';
import Activities from './Activities/Activities';
import Training from './Training/Training';
import Hamfest from './hamfest/Hamfest';
import HamfestStore from './hamfest/HamfestStore';
import Checkout from './hamfest/Checkout';
import HamfestConfirmation from './hamfest/confirmation';

//Tests: 19 passing 2 pending/failing
describe('Routes', () => {
  beforeEach(() => {
    sinon.stub(rrd, 'BrowserRouter').callsFake(({ childern }) => {
      return <div>{childern}</div>;
    });
  });
  afterEach(() => {
    rrd.BrowserRouter.restore();
  });
  it('renders <Home /> at path /', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Home)).to.have.length(1);
    expect(wrapper.find(MemberPage)).to.have.length(0);
  });
  it('renders <MemberPage /> at path /memberpage', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/memberPage']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(MemberPage)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <MemberPageSignup /> at path /memberPageSignup', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/MemberPageSignup']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(signup)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <Membership /> at path /Membership', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/Membership']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Membership)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  //Failing due to paypal not defined in tests
  xit('renders <MembershipConfirmation /> at path /membershipConfirmation', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/membershipConfirmation']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(MemberConfirmation)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <MembershipForm /> at path /membershipForm', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/membershipForm']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(MembershipForm)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <TextApplication /> at path /TextApplication', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/TextApplication']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(TextApplication)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <References /> at path /References', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/References']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(References)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <AboutUs /> at path /About', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/About']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(AboutUs)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <Bylaws /> at path /Bylaws', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/Bylaws']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Bylaws)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <ContactUs /> at path /ContactUs', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/ContactUs']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(ContactUs)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <Repeaters /> at path /Repeaters', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/Repeaters']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Repeaters)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <OfficerHistory /> at path /OfficerHistory', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/OfficerHistory']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(OfficerHistory)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <News /> at path /News', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/News']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(News)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <MyCalender /> at path /Calendar', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/Calendar']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(MyCalender)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <Activities /> at path /Events', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/Events']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Activities)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <Training /> at path /Training', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/Training']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Training)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <Hamfest /> at path /Hamfest', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/Hamfest']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Hamfest)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <HamfestSote /> at path /HamfestStore', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/HamfestStore']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(HamfestStore)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  it('renders <Checkout /> at path /hamfestCheckout', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/hamfestCheckout']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Checkout)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
  //Failing due to paypal not defined in tests
  xit('renders <HamfestConfirmation /> at path /hamfestConfirmation', () => {
    const wrapper = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/hamfestConfirmation']}>
          <Routes />
        </rrd.MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(HamfestConfirmation)).to.have.length(1);
    expect(wrapper.find(Home)).to.have.length(0);
  });
});
