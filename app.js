import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Routes from './routes'
import Footer from './Footer'

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