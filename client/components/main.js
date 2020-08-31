import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header'
import NavBar from './NavBar'
import Membership from './membership/Membership'
import Footer from './Footer'
import MembershipForm from './membership/membershipForm'
import HamfestStore from './hamfest/HamfestStore'
import Checkout from './hamfest/Checkout';

export default class Main extends Component {

    render () {
        return (
            <div>
                <div>
                    <Header />
                    <NavBar />
                </div>
                <main>
                    <Route path="/membership" component={Membership} />
                    <Route path="/membershipForm" component={MembershipForm} />
                    <Route path="/hamfest/store" component={HamfestStore} />
                    <Route path="/hamfest/Checkout" component={Checkout} />

                </main>
                <div>
                    <Footer />
                </div>
            </div>
        )
    }
}