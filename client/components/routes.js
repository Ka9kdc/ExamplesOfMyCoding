import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Membership from './membership/Membership';
import MembershipForm from './membership/membershipForm';
import HamfestStore from './hamfest/HamfestStore';
import Checkout from './hamfest/Checkout';
import MemberPage from './MemberPage/MemberPage';
import MemberConfirmation from './membership/MemberConfirmation';
import HamfestConfirmation from './hamfest/confirmation';
import signup from './MemberPage/signup';
import References from './References';
import AboutUs from './AboutUs/AboutUs';
import Bylaws from './AboutUs/Bylaws';
import ContactUs from './AboutUs/ContactUs';
import Repeaters from './singlepages/Repeaters';
import OfficerHistory from './AboutUs/OfficerHistory';
import News from './singlepages/News';
import Home from './home/Home';
import MyCalender from './singlepages/calendar';
import Activities from './Activities/Activities';
import Training from './Training/Training';
import TextApplication from './membership/TextApplication';
import Hamfest from './hamfest/Hamfest';

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/Membership" component={Membership} />
      <Route
        path="/membershipConfirmation"
        component={MemberConfirmation}
      />
      <Route path="/membershipForm" component={MembershipForm} />
      <Route path="/TextApplication" component={TextApplication} />

      <Route path="/memberPage" component={MemberPage} />
      <Route path="/MemberPageSignup" component={signup} />

      <Route path="/References" component={References} />
      <Route path="/About" component={AboutUs} />
      <Route path="/Bylaws" component={Bylaws} />
      <Route path="/ContactUs" component={ContactUs} />
      <Route path="/Repeaters" component={Repeaters} />
      <Route path="/OfficerHistory" component={OfficerHistory} />
      <Route path="/News" component={News} />
      <Route exact path="/" component={Home} />
      <Route path="/Calendar" component={MyCalender} />
      <Route path="/Events" component={Activities} />
      <Route path="/Training" component={Training} />

      <Route path="/Hamfest" component={Hamfest} />
      <Route path="/HamfestStore" component={HamfestStore} />
      <Route path="/hamfestCheckout" component={Checkout} />
      <Route path="/hamfestConfirmation" component={HamfestConfirmation} />
    </Switch>
  );
};

export default Routes;
