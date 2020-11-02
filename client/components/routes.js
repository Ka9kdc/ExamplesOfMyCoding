import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Membership from './membership/Membership'
import MembershipForm from './membership/membershipForm'
import HamfestStore from './hamfest/HamfestStore'
import Checkout from './hamfest/Checkout'
import MemberPage from './MemberPage/MemberPage'
import MembershipConfirmation from './membership/MemberConfirmation'
import HamfestConfirmation from './hamfest/confirmation'
import signup from './MemberPage/signup';
import References from './References';
import AboutUs from './AboutUs/AboutUs';
import Bylaws from './AboutUs/Bylaws';
import ContactUs from './AboutUs/ContactUs';
import Repeaters from './AboutUs/Repeaters';
import OfficerHistory from './AboutUs/OfficerHistory';


const Routes = props => {
    return (
        

        <Switch >
        
            <Route path="/Membership" component={Membership} />
            <Route path="/membershipConfirmation" component={MembershipConfirmation} />
            <Route path="/membershipForm" component={MembershipForm} />
            <Route path="/hamfestStore" component={HamfestStore} />
            <Route path="/hamfestCheckout" component={Checkout} />
            <Route path='/hamfestConfirmation' component={HamfestConfirmation} />
            <Route path='/memberPage' component={MemberPage} />
            <Route path='/MemberPageSignup' component={signup} />
            <Route path='/References' component={References} />
            <Route path="/About" component={AboutUs} />
            <Route path="/Bylaws" component={Bylaws} />
            <Route path='/ContactUs' component={ContactUs} />
            <Route path="/Repeaters" component={Repeaters} />
            <Route path="/OfficerHistory" component={OfficerHistory} />

        </Switch>
            
    )
}


export default Routes