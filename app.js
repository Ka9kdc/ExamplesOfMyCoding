import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'

import Header from './components/Header'
import Navbar from './components/Navbar'
import Routes from './components/Routes'
import Footer from './components/Footer'

const App = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <h1>Hello World</h1>
            <Routes />
            <Footer />
        </div>
    )
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'))