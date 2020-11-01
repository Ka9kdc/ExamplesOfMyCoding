import React from 'react';
import { Route, BrowserRouter as Router  } from 'react-router-dom';
import Header from './Header'
import NavBar from './NavBar'
import Membership from './membership/Membership'
import Footer from './Footer'
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


export default class Main extends React.Component {
    

    render () {
        return (
            <div>

                <Router >
                <div>
                    <Header />
                    <NavBar />
                </div>
                <main>
                    <Route path="/membership" component={Membership} />
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

                </main>
                </Router>
                <div>
                    <Footer />
                </div>
               
            </div>
        )
    }
}