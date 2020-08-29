import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header'
import NavBar from './NavBar'
import Membership from './Membership'

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
                </main>
            </div>
        )
    }
}