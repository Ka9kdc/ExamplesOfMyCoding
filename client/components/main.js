import React from 'react';
import { Route, BrowserRouter as Router  } from 'react-router-dom';
import Header from './Header'
import NavBar from './NavBar'
import Membership from './membership/Membership'
import Footer from './Footer'
import MembershipForm from './membership/membershipForm'
import HamfestStore from './hamfest/HamfestStore'
import Checkout from './hamfest/Checkout';


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
                    <Route path="/membershipForm" component={MembershipForm} />
                    <Route path="/hamfestStore" component={HamfestStore} />
                    <Route path="/hamfestCheckout" component={Checkout} />

                </main>
                </Router>
                <div>
                    <Footer />
                </div>
            </div>
        )
    }
}