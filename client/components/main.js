import React from 'react';

import Header from './Header'
import NavBar from './NavBar'

import Footer from './Footer'
import Routes from './routes';



export default class Main extends React.Component {
    render () {
        return (
            <div>
                <Header />
                <NavBar />
                <Routes />
                <Footer />
            </div>
        )
    }
}